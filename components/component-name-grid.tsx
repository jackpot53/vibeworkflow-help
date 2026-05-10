const COMPONENTS = [
  'Accordion', 'Alert', 'Alert Dialog', 'Aspect Ratio', 'Avatar',
  'Badge', 'Breadcrumb', 'Button', 'Button Group', 'Calendar',
  'Card', 'Carousel', 'Chart', 'Checkbox', 'Collapsible',
  'Combobox', 'Command', 'Context Menu', 'Data Table', 'Date Picker',
  'Dialog', 'Direction', 'Drawer', 'Dropdown Menu', 'Empty',
  'Field', 'Hover Card', 'Input', 'Input Group', 'Input OTP',
  'Item', 'Kbd', 'Label', 'Menubar', 'Native Select',
  'Navigation Menu', 'Pagination', 'Popover', 'Progress', 'Radio Group',
  'Resizable', 'Scroll Area', 'Select', 'Separator', 'Sheet',
  'Sidebar', 'Skeleton', 'Slider', 'Sonner', 'Spinner',
  'Switch', 'Table', 'Tabs', 'Textarea', 'Toast',
  'Toggle', 'Toggle Group', 'Tooltip', 'Typography',
]

export function ComponentNameGrid() {
  return (
    <div className="not-prose grid grid-cols-2 gap-2.5 my-6">
      {COMPONENTS.map((name) => (
        <div
          key={name}
          className="rounded-lg border border-border bg-card px-4 py-3"
        >
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}
