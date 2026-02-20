'use client'

import { useState } from 'react'

const COLORS = {
  bg: '#0d0d14',
  surface: '#14141f',
  surfaceHover: '#1a1a2e',
  border: '#2a2a3d',
  text: '#e8e8f0',
  textMuted: '#8888a0',
  textDim: '#5a5a72',
  accent: '#8b5cf6',
  accentLight: '#a78bfa',
  accentDim: 'rgba(139, 92, 246, 0.12)',
  accentGlow: 'rgba(139, 92, 246, 0.25)',
  green: '#22c55e',
  greenDim: 'rgba(34, 197, 94, 0.12)',
} as const

interface Permission {
  readonly icon: string
  readonly title: string
  readonly description: string
  readonly level: number
  readonly enabled: boolean
}

const INITIAL_PERMISSIONS: readonly Permission[] = [
  { icon: '📧', title: 'Gmail', description: 'Read and manage emails', level: 0, enabled: true },
  {
    icon: '📅',
    title: 'Google Calendar',
    description: 'View and create events',
    level: 1,
    enabled: true,
  },
  {
    icon: '💳',
    title: 'Payments',
    description: 'Make purchases on your behalf',
    level: 0,
    enabled: false,
  },
  {
    icon: '💬',
    title: 'Slack',
    description: 'Read and send messages',
    level: 0,
    enabled: true,
  },
]

const PERMISSION_LEVELS = ['Read', 'Write', 'Execute'] as const

function Toggle({
  enabled,
  onToggle,
  ariaLabel,
}: {
  readonly enabled: boolean
  readonly onToggle: () => void
  readonly ariaLabel: string
}) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        border: 'none',
        background: enabled ? COLORS.accent : COLORS.border,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
        minHeight: 44,
        minWidth: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <div
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            background: '#fff',
            position: 'absolute',
            top: 3,
            left: enabled ? 21 : 3,
            transition: 'left 0.2s',
          }}
        />
      </div>
    </button>
  )
}

function PermissionRow({
  permission,
  onToggle,
  onLevelChange,
}: {
  readonly permission: Permission
  readonly onToggle: () => void
  readonly onLevelChange: (level: number) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: COLORS.accentDim,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {permission.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: COLORS.text,
          }}
        >
          {permission.title}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: COLORS.textMuted,
            marginTop: 2,
          }}
        >
          {permission.description}
        </div>
        {permission.enabled && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {PERMISSION_LEVELS.map((label, index) => (
              <button
                key={label}
                onClick={() => onLevelChange(index)}
                aria-pressed={index <= permission.level}
                style={{
                  padding: '3px 10px',
                  borderRadius: 6,
                  border: `1px solid ${index <= permission.level ? COLORS.accent : COLORS.border}`,
                  background: index <= permission.level ? COLORS.accentDim : 'transparent',
                  color: index <= permission.level ? COLORS.accentLight : COLORS.textDim,
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                  minHeight: 44,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <Toggle
        enabled={permission.enabled}
        onToggle={onToggle}
        ariaLabel={`${permission.enabled ? 'Revoke' : 'Grant'} ${permission.title} access`}
      />
    </div>
  )
}

export function ConsentScreenDemo() {
  const [permissions, setPermissions] = useState<readonly Permission[]>(INITIAL_PERMISSIONS)
  const [spendLimit, setSpendLimit] = useState(50)
  const [authorized, setAuthorized] = useState(false)

  function togglePermission(index: number) {
    setPermissions((prev) => prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p)))
  }

  function changeLevel(index: number, level: number) {
    setPermissions((prev) => prev.map((p, i) => (i === index ? { ...p, level } : p)))
  }

  function handleAuthorize() {
    setAuthorized(true)
    setTimeout(() => setAuthorized(false), 2000)
  }

  function handleDeny() {
    setPermissions(INITIAL_PERMISSIONS)
    setSpendLimit(50)
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        background: COLORS.surface,
        borderRadius: 20,
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
        boxShadow: `0 0 80px ${COLORS.accentGlow}, 0 20px 60px rgba(0,0,0,0.5)`,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 24px 20px',
          borderBottom: `1px solid ${COLORS.border}`,
          background: 'linear-gradient(180deg, rgba(139,92,246,0.06) 0%, transparent 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              padding: '3px 10px',
              borderRadius: 20,
              background: COLORS.greenDim,
              fontSize: 11,
              color: COLORS.green,
              fontWeight: 500,
            }}
          >
            Verified Agent
          </div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
            aria-hidden="true"
          >
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: COLORS.text }}>OpenClaw Agent</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
              wants access to your services
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div style={{ padding: '8px 24px 0' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textDim,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          Permissions
        </div>
        {permissions.map((permission, index) => (
          <PermissionRow
            key={permission.title}
            permission={permission}
            onToggle={() => togglePermission(index)}
            onLevelChange={(level) => changeLevel(index, level)}
          />
        ))}
      </div>

      {/* Spending limit */}
      <div style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, color: COLORS.text }}>Spending limit</div>
            <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 2 }}>
              Per transaction without approval
            </div>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.accent,
            }}
          >
            ${spendLimit}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={spendLimit}
          onChange={(e) => setSpendLimit(Number(e.target.value))}
          aria-label="Spending limit per transaction"
          style={{
            width: '100%',
            marginTop: 12,
            accentColor: COLORS.accent,
            height: 4,
            minHeight: 44,
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: COLORS.textDim,
            marginTop: 4,
          }}
        >
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '12px 24px 24px', display: 'flex', gap: 10 }}>
        <button
          onClick={handleDeny}
          style={{
            flex: 1,
            padding: '12px 0',
            borderRadius: 12,
            border: `1px solid ${COLORS.border}`,
            background: 'transparent',
            fontFamily: 'inherit',
            fontWeight: 500,
            fontSize: 14,
            color: COLORS.textMuted,
            cursor: 'pointer',
            minHeight: 44,
          }}
        >
          Deny
        </button>
        <button
          onClick={handleAuthorize}
          style={{
            flex: 2,
            padding: '12px 0',
            borderRadius: 12,
            border: 'none',
            background: authorized
              ? COLORS.green
              : `linear-gradient(135deg, ${COLORS.accent}, #6d28d9)`,
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: 14,
            color: '#fff',
            cursor: 'pointer',
            boxShadow: `0 4px 20px ${COLORS.accentGlow}`,
            minHeight: 44,
            transition: 'background 0.2s',
          }}
        >
          {authorized ? 'Authorized ✓' : 'Authorize Agent'}
        </button>
      </div>
    </div>
  )
}
