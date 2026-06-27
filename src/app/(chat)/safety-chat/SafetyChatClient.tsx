'use client'

import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChatProject, ChatThread } from '@/lib/safetyChat'
import { Ic } from './SafetyChatIcon'
import {
  createProjectAction,
  renameThreadAction,
  moveThreadAction,
  deleteThreadAction,
} from './actions'

/**
 * Safety Chat client — pixel-faithful port of design-reference/project/assets/
 * safety-chat-app.jsx. The design's localStorage model is replaced with server-side
 * persistence: CRUD goes through server actions, and a message + the streamed reply
 * go through the /safety-chat/stream route. Icons are React-owned inline SVG.
 */

type Att = { name: string; ext: string; sizeLabel: string }
type Msg = { role: 'user' | 'bot'; text: string; atts?: Att[]; streaming?: boolean }
type Chat = { id: number; projectId: number | null; title: string; messages: Msg[] }
type DraftAtt = { id: string; name: string; ext: string; size: number; file: File }

const SAFE_EXT = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt', 'md', 'rtf', 'png', 'jpg', 'jpeg', 'webp']
const ACCEPT = SAFE_EXT.map((e) => '.' + e).join(',')
const MAX_BYTES = 25 * 1024 * 1024
const extOf = (n: string) => (n.split('.').pop() || '').toLowerCase()
const iconForExt = (ext: string) => {
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'sheet'
  if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) return 'image'
  if (ext === 'pdf') return 'file-text'
  return 'file'
}
const fmtSize = (b: number) =>
  b < 1024 ? b + ' B' : b < 1048576 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1) + ' MB'
const uid = () => Math.random().toString(36).slice(2, 9)

const PROMPTS = [
  { ico: 'git-compare', t: 'Compare SIL and PL', d: 'How do IEC 61508 SIL targets map to ISO 13849 PL?' },
  { ico: 'clipboard-list', t: 'Outline a HARA', d: 'What sections and parameters belong in a HARA?' },
  { ico: 'bot', t: 'Mobile-robot standards', d: 'Which standards apply to an AMR in a shared workspace?' },
  { ico: 'file-check', t: 'Certification readiness', d: 'What evidence does an audit usually expect?' },
]

/* Wrap standards codes in mono chips. */
const CODE_RE = /(ISO\s?\d{3,5}(?:-\d+)?|IEC\s?\d{3,5}(?:-\d+)?|SIL\s?\d|PL\s?[a-e]\b|ASIL\s?[A-D]|MTTFd|HARA|FMEA|PFH[D]?|V&V)/g
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, pi) => {
        const parts = para.split(CODE_RE)
        return (
          <p key={pi}>
            {parts.map((p, i) =>
              CODE_RE.test(p) ? (
                <span className="mono" key={i}>
                  {p}
                </span>
              ) : (
                <React.Fragment key={i}>{p}</React.Fragment>
              ),
            )}
          </p>
        )
      })}
    </>
  )
}

function AttChip({ att, onRemove }: { att: Att; onRemove?: () => void }) {
  return (
    <div className="sca-att">
      <span className="sca-att__ico">
        <Ic name={iconForExt(att.ext)} />
      </span>
      <span className="sca-att__meta">
        <span className="sca-att__name">{att.name}</span>
        <span className="sca-att__sub">
          {att.ext.toUpperCase()} · {att.sizeLabel}
        </span>
      </span>
      {onRemove && (
        <button className="sca-att__rm" onClick={onRemove} aria-label={'Remove ' + att.name}>
          <Ic name="x" />
        </button>
      )}
    </div>
  )
}

function RowMenu({
  pos,
  projects,
  chat,
  onMove,
  onRename,
  onDelete,
  onClose,
}: {
  pos: { x: number; y: number }
  projects: ChatProject[]
  chat: Chat
  onMove: (id: number, projectId: number | null) => void
  onRename: (id: number) => void
  onDelete: (id: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  const style: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(pos.y, window.innerHeight - 320),
    left: Math.min(pos.x, window.innerWidth - 210),
  }
  return (
    <div className="sca-menu" style={style} ref={ref} role="menu">
      <div className="sca-menu__label">Move to project</div>
      <button className="sca-menu__item" onClick={() => onMove(chat.id, null)}>
        <Ic name="inbox" />
        <span>No project</span>
        {chat.projectId == null && (
          <span className="sca-menu__check">
            <Ic name="check" />
          </span>
        )}
      </button>
      {projects.map((p) => (
        <button className="sca-menu__item" key={p.id} onClick={() => onMove(chat.id, p.id)}>
          <Ic name={p.icon} />
          <span>{p.name}</span>
          {chat.projectId === p.id && (
            <span className="sca-menu__check">
              <Ic name="check" />
            </span>
          )}
        </button>
      ))}
      <div className="sca-menu__sep"></div>
      <button className="sca-menu__item" onClick={() => onRename(chat.id)}>
        <Ic name="pencil" />
        <span>Rename</span>
      </button>
      <button className="sca-menu__item sca-menu__item--danger" onClick={() => onDelete(chat.id)}>
        <Ic name="trash-2" />
        <span>Delete chat</span>
      </button>
    </div>
  )
}

function ChatRow({
  chat,
  active,
  onSelect,
  onKebab,
}: {
  chat: Chat
  active: boolean
  onSelect: (id: number) => void
  onKebab: (e: React.MouseEvent, chat: Chat) => void
}) {
  return (
    <div
      className={'sca-chat' + (active ? ' is-active' : '')}
      onClick={() => onSelect(chat.id)}
      data-screen-label="Chat Row"
    >
      <Ic name="message-square" className="sca-chat__ico" />
      <span className="sca-chat__title">{chat.title}</span>
      <button
        className="sca-chat__kebab"
        onClick={(e) => {
          e.stopPropagation()
          onKebab(e, chat)
        }}
        aria-label="Chat options"
      >
        <Ic name="more-horizontal" />
      </button>
    </div>
  )
}

export function SafetyChatClient({
  projects: projects0,
  threads,
  user,
}: {
  projects: ChatProject[]
  threads: ChatThread[]
  user: { fullName: string; initials: string; plan: string }
}) {
  const [projects, setProjects] = useState<ChatProject[]>(projects0)
  const [chats, setChats] = useState<Chat[]>(
    threads.map((t) => ({ id: t.id, projectId: t.projectId, title: t.title, messages: t.messages as Msg[] })),
  )
  const [activeId, setActiveId] = useState<number | null>(threads[0]?.id ?? null)
  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [atts, setAtts] = useState<DraftAtt[]>([])
  const [reject, setReject] = useState('')
  const [generating, setGenerating] = useState(false)
  const [menu, setMenu] = useState<{ pos: { x: number; y: number }; chat: Chat } | null>(null)
  const [sideOpen, setSideOpen] = useState(false)
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set(projects0.map((p) => p.id)))

  const fileRef = useRef<HTMLInputElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const abortedRef = useRef(false)

  const active = chats.find((c) => c.id === activeId) || null

  // Autoscroll thread on message / generating change.
  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [active?.messages.length, active?.messages[active.messages.length - 1]?.text, generating, activeId])

  // Autosize textarea.
  const sizeInput = useCallback(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  }, [])
  useEffect(() => {
    sizeInput()
  }, [draft, sizeInput])

  /* ----- sidebar / chat selection ----- */
  const setActive = (id: number) => {
    setActiveId(id)
    setSideOpen(false)
  }
  const newChat = (projectId: number | null = null) => {
    setActiveId(null)
    setPendingProjectId(projectId)
    setSideOpen(false)
    setDraft('')
    setAtts([])
    setReject('')
    setTimeout(() => inputRef.current && inputRef.current.focus(), 60)
  }
  const newProject = async () => {
    const name = (window.prompt('Name your project', 'New project') || '').trim()
    if (!name) return
    const res = await createProjectAction(name)
    if (res.project) {
      setProjects((p) => [...p, res.project!])
      setOpenIds((s) => new Set(s).add(res.project!.id))
    }
  }
  const toggleProject = (id: number) =>
    setOpenIds((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const moveChat = (chatId: number, projectId: number | null) => {
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, projectId } : c)))
    setMenu(null)
    void moveThreadAction(chatId, projectId)
  }
  const renameChat = (chatId: number) => {
    const c = chats.find((x) => x.id === chatId)
    if (!c) return
    const t = (window.prompt('Rename chat', c.title) || '').trim()
    setMenu(null)
    if (!t) return
    setChats((cs) => cs.map((x) => (x.id === chatId ? { ...x, title: t } : x)))
    void renameThreadAction(chatId, t)
  }
  const deleteChat = (chatId: number) => {
    setMenu(null)
    setChats((cs) => {
      const remaining = cs.filter((c) => c.id !== chatId)
      setActiveId((cur) => (cur === chatId ? remaining[0]?.id ?? null : cur))
      return remaining
    })
    void deleteThreadAction(chatId)
  }
  const openKebab = (e: React.MouseEvent, chat: Chat) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMenu({ pos: { x: r.right - 196, y: r.bottom + 6 }, chat })
  }

  /* ----- file attach ----- */
  const pickFiles = () => {
    setReject('')
    fileRef.current && fileRef.current.click()
  }
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    const accepted: DraftAtt[] = []
    const bad: string[] = []
    files.forEach((f) => {
      const ext = extOf(f.name)
      if (!SAFE_EXT.includes(ext)) {
        bad.push(f.name + ' (type not allowed)')
        return
      }
      if (f.size > MAX_BYTES) {
        bad.push(f.name + ' (over 25 MB)')
        return
      }
      accepted.push({ id: uid(), name: f.name, ext, size: f.size, file: f })
    })
    if (accepted.length) setAtts((a) => [...a, ...accepted])
    setReject(
      bad.length
        ? 'Blocked ' +
            bad.length +
            ' file' +
            (bad.length > 1 ? 's' : '') +
            ': ' +
            bad.join(', ') +
            '. Only safe document & image files are accepted.'
        : '',
    )
  }
  const removeAtt = (id: string) => setAtts((a) => a.filter((x) => x.id !== id))

  /* ----- send / stop ----- */
  const stop = () => {
    abortedRef.current = true
    abortRef.current?.abort()
  }

  const send = useCallback(async () => {
    const text = draft.trim()
    if ((!text && atts.length === 0) || generating) return

    const outAtts = atts
    const userAtts: Att[] = outAtts.map((a) => ({ name: a.name, ext: a.ext, sizeLabel: fmtSize(a.size) }))
    const userMsg: Msg = { role: 'user', text: text || '(see attachments)', atts: userAtts }

    const wasNew = activeId == null
    const tempId = -Date.now()
    let workingId = wasNew ? tempId : activeId!

    setChats((prev) => {
      if (wasNew) {
        return [
          {
            id: tempId,
            projectId: pendingProjectId,
            title: text.slice(0, 42) || 'Attachment review',
            messages: [userMsg, { role: 'bot', text: '', streaming: true }],
          },
          ...prev,
        ]
      }
      return prev.map((c) =>
        c.id === workingId
          ? {
              ...c,
              title: c.messages.length === 0 ? text.slice(0, 42) || 'Attachment review' : c.title,
              messages: [...c.messages, userMsg, { role: 'bot', text: '', streaming: true }],
            }
          : c,
      )
    })
    if (wasNew) setActiveId(tempId)

    setDraft('')
    setAtts([])
    setReject('')
    setGenerating(true)
    abortedRef.current = false
    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const fd = new FormData()
      fd.append('text', text)
      fd.append('threadId', wasNew ? 'new' : String(workingId))
      fd.append('projectId', wasNew && pendingProjectId != null ? String(pendingProjectId) : '')
      outAtts.forEach((a) => fd.append('files', a.file, a.name))

      const res = await fetch('/safety-chat/stream', { method: 'POST', body: fd, signal: ctrl.signal })

      const realId = Number(res.headers.get('X-Thread-Id'))
      const realTitle = decodeURIComponent(res.headers.get('X-Thread-Title') || '')
      if (!Number.isNaN(realId) && realId !== workingId) {
        const prevWorking = workingId
        setChats((prev) => prev.map((c) => (c.id === prevWorking ? { ...c, id: realId, title: realTitle || c.title } : c)))
        setActiveId((cur) => (cur === prevWorking ? realId : cur))
        workingId = realId
      }

      if (!res.ok || !res.body) throw new Error('stream failed')
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = dec.decode(value, { stream: true })
        setChats((prev) =>
          prev.map((c) => {
            if (c.id !== workingId) return c
            const msgs = c.messages.slice()
            for (let j = msgs.length - 1; j >= 0; j--) {
              if (msgs[j].role === 'bot') {
                msgs[j] = { ...msgs[j], text: msgs[j].text + chunk }
                break
              }
            }
            return { ...c, messages: msgs }
          }),
        )
      }
    } catch {
      const suffix = abortedRef.current ? ' …[stopped]' : ''
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== workingId) return c
          const msgs = c.messages.slice()
          for (let j = msgs.length - 1; j >= 0; j--) {
            if (msgs[j].role === 'bot') {
              msgs[j] = { ...msgs[j], text: msgs[j].text + suffix }
              break
            }
          }
          return { ...c, messages: msgs }
        }),
      )
    } finally {
      const finalId = workingId
      setChats((prev) =>
        prev.map((c) => (c.id === finalId ? { ...c, messages: c.messages.map((m) => ({ ...m, streaming: false })) } : c)),
      )
      setGenerating(false)
      abortRef.current = null
    }
  }, [draft, atts, generating, activeId, pendingProjectId])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  /* ----- derived lists ----- */
  const q = query.trim().toLowerCase()
  const match = (c: Chat) => !q || c.title.toLowerCase().includes(q)
  const looseChats = chats.filter((c) => c.projectId == null && match(c))
  const chatsIn = (pid: number) => chats.filter((c) => c.projectId === pid && match(c))
  const canSend = draft.trim().length > 0 || atts.length > 0

  return (
    <div className={'sca' + (sideOpen ? ' is-side-open' : '')} data-screen-label="Safety Chat App">
      <div className="sca-scrim" onClick={() => setSideOpen(false)}></div>

      {/* Sidebar */}
      <aside className="sca-side" data-screen-label="Chat Sidebar">
        <div className="sca-side__top">
          <button className="btn btn--gold-pill sca-new" onClick={() => newChat(null)}>
            <Ic name="plus" /> New chat
          </button>
          <div className="sca-search">
            <Ic name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              aria-label="Search chats"
            />
          </div>
        </div>

        <div className="sca-scroll">
          <div className="sca-group">
            <div className="sca-group__head">
              <span className="sca-group__label">Projects</span>
              <button className="sca-group__add" onClick={newProject} aria-label="New project" title="New project">
                <Ic name="plus" />
              </button>
            </div>
            {projects.map((p) => {
              const inside = chatsIn(p.id)
              const open = openIds.has(p.id)
              return (
                <div className={'sca-proj' + (open ? ' is-open' : '')} key={p.id}>
                  <button className="sca-proj__head" onClick={() => toggleProject(p.id)}>
                    <Ic name="chevron-right" className="sca-proj__chev" />
                    <span className="sca-proj__ico">
                      <Ic name={p.icon} />
                    </span>
                    <span className="sca-proj__name">{p.name}</span>
                    <span className="sca-proj__count">{inside.length}</span>
                  </button>
                  <div className="sca-proj__body">
                    {inside.length === 0 ? (
                      <div className="sca-proj__empty">No chats yet</div>
                    ) : (
                      inside.map((c) => (
                        <ChatRow key={c.id} chat={c} active={c.id === activeId} onSelect={setActive} onKebab={openKebab} />
                      ))
                    )}
                    <div className="sca-chat" onClick={() => newChat(p.id)} style={{ color: 'var(--fg-4)' }}>
                      <Ic name="plus" className="sca-chat__ico" />
                      <span className="sca-chat__title">New chat in project</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="sca-group">
            <div className="sca-group__head">
              <span className="sca-group__label">Chats</span>
            </div>
            {looseChats.length === 0 ? (
              <div className="sca-proj__empty" style={{ paddingLeft: 10 }}>
                No chats here
              </div>
            ) : (
              looseChats.map((c) => (
                <ChatRow key={c.id} chat={c} active={c.id === activeId} onSelect={setActive} onKebab={openKebab} />
              ))
            )}
          </div>
        </div>

        <div className="sca-side__foot">
          <div className="sca-user">
            <span className="sca-user__ava">{user.initials}</span>
            <div className="sca-user__id">
              <div className="sca-user__name">{user.fullName}</div>
              <div className="sca-user__plan">Plan · {user.plan}</div>
            </div>
          </div>
          <div className="sca-side__disc">
            <Ic name="shield-alert" />
            <span>AI-augmented guidance. Verify against the governing standard and your risk assessment.</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <section className="sca-main">
        <header className="sca-top" data-screen-label="Chat Header">
          <button className="sca-top__menu" onClick={() => setSideOpen(true)} aria-label="Open chat list">
            <Ic name="panel-left" />
          </button>
          <div className="sca-top__id">
            <div className="sca-top__crumb">
              <Ic name="shield-check" />
              Safety Chat
              {active && active.projectId != null && (
                <>
                  <span style={{ opacity: 0.5 }}>/</span>
                  {(projects.find((p) => p.id === active.projectId) || { name: '' }).name}
                </>
              )}
            </div>
            <div className="sca-top__title">{active ? active.title : 'New conversation'}</div>
          </div>
        </header>

        <div className="sca-thread" ref={threadRef}>
          {!active || active.messages.length === 0 ? (
            <div className="sca-empty" data-screen-label="Welcome State">
              <span className="sca-empty__mark">
                <Ic name="shield-check" />
              </span>
              <h1 className="csa-h2 sca-empty__title">Ask a functional safety question.</h1>
              <p className="csa-lead sca-empty__sub">
                Quick, high-level engineering insight on SIL &amp; PL targets, standards scope, HARA structure, and
                certification readiness — grounded in the frameworks CSA works in every day.
              </p>
              <div className="sca-prompts">
                {PROMPTS.map((p) => (
                  <button
                    className="sca-prompt"
                    key={p.t}
                    onClick={() => {
                      setDraft(p.d)
                      setTimeout(() => inputRef.current && inputRef.current.focus(), 30)
                    }}
                  >
                    <span className="sca-prompt__ico">
                      <Ic name={p.ico} />
                    </span>
                    <span>
                      <span className="sca-prompt__t">{p.t}</span>
                      <span className="sca-prompt__d">{p.d}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="sca-thread__inner">
              {active.messages.map((m, i) => (
                <div className={'sca-msg sca-msg--' + (m.role === 'bot' ? 'bot' : 'user')} key={i}>
                  <span className="sca-msg__ava">{m.role === 'bot' ? <Ic name="shield-check" /> : user.initials}</span>
                  <div className="sca-msg__body">
                    <div className="sca-msg__who">{m.role === 'bot' ? 'Safety Chat' : 'You'}</div>
                    {m.atts && m.atts.length > 0 && (
                      <div className="sca-msg__atts">
                        {m.atts.map((a, ai) => (
                          <AttChip key={ai} att={a} />
                        ))}
                      </div>
                    )}
                    <div className="sca-msg__text">
                      {m.role === 'bot' && m.text === '' ? (
                        <span className="sca-typing">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      ) : (
                        <RichText text={m.text} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="sca-dock">
          <div className="sca-dock__inner">
            {reject && (
              <div className="sca-reject">
                <Ic name="shield-x" />
                <span>{reject}</span>
              </div>
            )}
            {atts.length > 0 && (
              <div className="sca-tray">
                {atts.map((a) => (
                  <AttChip
                    key={a.id}
                    att={{ name: a.name, ext: a.ext, sizeLabel: fmtSize(a.size) }}
                    onRemove={() => removeAtt(a.id)}
                  />
                ))}
              </div>
            )}

            <div className="sca-composer" data-metal="silver" data-metal-thickness="2">
              <div className="sca-composer__row">
                <input ref={fileRef} type="file" accept={ACCEPT} multiple style={{ display: 'none' }} onChange={onFiles} />
                <button
                  className="sca-upload"
                  onClick={pickFiles}
                  aria-label="Attach safe files"
                  title="Attach files (PDF, Office, images)"
                >
                  <Ic name="plus" />
                </button>
                <textarea
                  ref={inputRef}
                  className="sca-input"
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about a SIL, a PL, a standard’s scope, a HARA…"
                  aria-label="Message Safety Chat"
                ></textarea>

                <div className="sca-send-wrap">
                  {generating ? (
                    <button
                      className="sca-send sca-send--stop"
                      data-glow
                      data-glow-bleed="14"
                      data-glow-colors="#CB5B4E,#E0A24A"
                      onClick={stop}
                      aria-label="Stop generating"
                    >
                      <span className="sca-stopsq"></span>
                    </button>
                  ) : (
                    <button
                      className="sca-send"
                      data-glow
                      data-glow-bleed="14"
                      onClick={() => void send()}
                      disabled={!canSend}
                      aria-label="Send message"
                    >
                      <Ic name="arrow-up" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="sca-dock__hint">
              <b>Enter</b> to send <span className="sep">·</span> <b>Shift + Enter</b> for a new line{' '}
              <span className="sep">·</span> Safe files only (PDF, DOCX, XLSX, CSV, images)
            </p>
          </div>
        </div>
      </section>

      {menu && (
        <RowMenu
          pos={menu.pos}
          projects={projects}
          chat={menu.chat}
          onMove={moveChat}
          onRename={renameChat}
          onDelete={deleteChat}
          onClose={() => setMenu(null)}
        />
      )}
    </div>
  )
}
