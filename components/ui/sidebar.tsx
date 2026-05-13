'use client'

import * as React from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// ─── Context ─────────────────────────────────────────────────────────────────

type SidebarState = 'expanded' | 'collapsed'

type SidebarContextValue = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

// ─── Provider ─────────────────────────────────────────────────────────────────

function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [_open, setOpenState] = React.useState(defaultOpen)
  const open = openProp !== undefined ? openProp : _open

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (openProp !== undefined) onOpenChange?.(value)
      else setOpenState(value)
    },
    [openProp, onOpenChange]
  )

  const toggleSidebar = React.useCallback(() => setOpen(!open), [open, setOpen])

  return (
    <SidebarContext.Provider
      value={{ state: open ? 'expanded' : 'collapsed', open, setOpen, toggleSidebar, isMobile: false }}
    >
      <div
        data-sidebar="provider"
        data-state={open ? 'expanded' : 'collapsed'}
        className={cn('group/sidebar-wrapper flex min-h-full w-full', className)}
        style={
          {
            '--sidebar-width': '18rem',
            '--sidebar-width-icon': '3rem',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { state } = useSidebar()

  return (
    <div
      data-sidebar="sidebar"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      className={cn(
        'group peer hidden md:flex flex-col text-sidebar-foreground',
        'relative h-svh w-[var(--sidebar-width)] transition-[width] duration-200 ease-linear',
        'bg-sidebar border-r border-border',
        state === 'collapsed' && collapsible === 'offcanvas' && 'w-0 overflow-hidden border-r-0',
        state === 'collapsed' && collapsible === 'icon' && 'w-[var(--sidebar-width-icon)]',
        variant === 'floating' && 'rounded-xl border shadow-sm m-2 h-[calc(100svh-1rem)]',
        variant === 'inset' && 'bg-muted rounded-xl m-2 h-[calc(100svh-1rem)]',
        className
      )}
      {...props}
    >
      <div
        data-sidebar="sidebar-inner"
        className="flex h-full w-full flex-col overflow-hidden"
      >
        {children}
      </div>
    </div>
  )
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

// ─── Rail ─────────────────────────────────────────────────────────────────────

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
        'hover:after:bg-sidebar-border group-data-[side=left]:-right-4',
        'sm:flex cursor-w-resize group-data-[side=right]:cursor-e-resize',
        className
      )}
      {...props}
    />
  )
}

// ─── Inset ────────────────────────────────────────────────────────────────────

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-sidebar="inset"
      className={cn('relative flex min-h-svh flex-1 flex-col overflow-auto bg-background', className)}
      {...props}
    />
  )
}

// ─── Header / Content / Footer ────────────────────────────────────────────────

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="content"
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto', className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-sidebar="separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  )
}

// ─── Group ────────────────────────────────────────────────────────────────────

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground/80 outline-none',
        'overflow-hidden transition-[margin,opacity] duration-200 ease-linear',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:-mt-8',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      data-sidebar="group-action"
      className={cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-muted-foreground outline-none',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-0.5', className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  isActive = false,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & { isActive?: boolean }) {
  return (
    <button
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(
        'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'transition-colors',
        isActive && 'bg-accent text-accent-foreground font-medium',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:size-8 group-data-[state=collapsed]:group-data-[collapsible=icon]:p-0 group-data-[state=collapsed]:group-data-[collapsible=icon]:justify-center',
        '[&>span:last-child]:truncate',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:[&>span:last-child]:hidden',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function SidebarMenuAction({ className, showOnHover = false, ...props }: React.ComponentProps<'button'> & { showOnHover?: boolean }) {
  return (
    <button
      data-sidebar="menu-action"
      className={cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-muted-foreground outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        showOnHover && 'opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100',
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="menu-badge"
      className={cn(
        'ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium tabular-nums text-muted-foreground',
        'select-none pointer-events-none',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

// ─── SubMenu ──────────────────────────────────────────────────────────────────

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu-sub"
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-0.5 border-l border-border py-0.5 pl-2.5',
        'group-data-[state=collapsed]:group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('', className)} {...props} />
}

function SidebarMenuSubButton({
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'button'> & { isActive?: boolean }) {
  return (
    <button
      data-sidebar="menu-sub-button"
      data-active={isActive}
      className={cn(
        'flex h-7 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-muted-foreground text-xs outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive && 'bg-accent text-accent-foreground',
        '[&>svg]:size-3.5 [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  )
}

export {
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
}
