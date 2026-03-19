import { Component } from "@angular/core";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
<aside class="hidden lg:flex flex-col pt-12 pb-8 px-6 gap-y-6 
              h-[calc(100vh-64px)] w-68 bg-slate-50 
              border-r border-[#000f24]/8 sticky top-16">
  <div>
    <h3 class="font-[Inter] text-[10px] font-semibold uppercase tracking-[2.5px] text-slate-400">Filters</h3>
    <p class="text-[9px] text-slate-300 uppercase tracking-[2px] mt-0.5">Category</p>
  </div>

  <nav class="flex flex-col gap-0.5">
    @for (item of navItems; track item.label) {
      <div [class]="item.active
        ? 'flex items-center gap-3 px-4 py-3 bg-[#000f24]/8 text-[#000f24] font-bold rounded-lg cursor-pointer'
        : 'flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 hover:translate-x-1 cursor-pointer rounded-lg transition-all'">
        <span class="material-symbols-outlined text-[18px]">{{ item.icon }}</span>
        <span class="font-[Inter] text-[11px] font-semibold uppercase tracking-[1.5px]">{{ item.label }}</span>
      </div>
    }
  </nav>

  <div class="mt-auto pt-6 border-t border-[#000f24]/8 space-y-3">
    <p class="font-[Inter] text-[10px] font-bold uppercase tracking-[1.5px] text-slate-500">Status</p>
    <div class="flex gap-2">
      <span class="px-3 py-1 rounded-full bg-[#000f24] text-white text-[10px] font-bold cursor-pointer">Active</span>
      <span class="px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-pointer hover:bg-slate-300 transition-colors">Expired</span>
    </div>
    <button class="w-full py-3 px-4 rounded-lg bg-[#000f24] text-white font-[Manrope] text-[11px] font-bold uppercase tracking-[1.5px] hover:bg-[#0d2140] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0px_8px_24px_rgba(0,15,36,0.18)]">
      <span class="material-symbols-outlined text-[16px]">add</span>
      New Task
    </button>
  </div>
</aside>
  `
})
export class SidebarComponent {
navItems = [
  { label: 'All Tasks',    icon: 'checklist',   active: true  },
  { label: 'Pending',      icon: 'pending',      active: false },
  { label: 'In Progress',  icon: 'autorenew',    active: false },
  { label: 'Completed',    icon: 'task_alt',     active: false },
  { label: 'High Priority',icon: 'flag',         active: false },
];
}