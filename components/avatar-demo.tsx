'use client'

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/ui/avatar'

const TEAM = [
  { name: '김지수', initials: '김지', src: 'https://24365withblinks.com/images/about/profile_jisoo.jpg' },
  { name: '이민준', initials: '이민', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBW9G3a0VUkCDVYrVlVOffv_MU4J6uliJ6g&s' },
  { name: '박서연', initials: '박서', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L_eIa-ScFPOiAqaUpe7Loy9Bku1O0zkMgw&s' },
  { name: '최지후', initials: '최지', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLjEDQ8vsPOiGgZiDYbp_rsk6knPVCVCgWQ&s' },
  { name: '정수아', initials: '정수', src: '' },
]

const WRAP = 'not-prose flex flex-wrap items-end gap-5 rounded-xl border border-border bg-card px-6 py-5 my-4'

export function AvatarBasicDemo() {
  return (
    <div className={WRAP}>
      {TEAM.map((u) => (
        <div key={u.name} className="flex flex-col items-center gap-1.5">
          <Avatar>
            <AvatarImage src={u.src} alt={u.name} />
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{u.name}</span>
        </div>
      ))}
    </div>
  )
}

export function AvatarSizeDemo() {
  const u = TEAM[0]
  return (
    <div className={WRAP}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-1.5">
          <Avatar size={size}>
            <AvatarImage src={u.src} alt={u.name} />
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}

export function AvatarBadgeDemo() {
  const badges = [
    { user: TEAM[0], color: 'bg-green-500', label: '온라인' },
    { user: TEAM[1], color: 'bg-yellow-400', label: '자리비움' },
    { user: TEAM[2], color: 'bg-muted-foreground', label: '오프라인' },
  ]
  return (
    <div className={WRAP}>
      {badges.map(({ user, color, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <Avatar size="lg">
            <AvatarImage src={user.src} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
            <AvatarBadge className={color} />
          </Avatar>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function AvatarGroupDemo() {
  return (
    <div className={WRAP}>
      <AvatarGroup>
        {TEAM.map((u) => (
          <Avatar key={u.name}>
            <AvatarImage src={u.src} alt={u.name} />
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
