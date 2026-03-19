import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[ButtonModule],
  template: `
<header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md 
               border-b border-[#000f24]/8 shadow-[0px_12px_32px_rgba(0,15,36,0.06)] 
               h-16 flex items-center px-8 justify-between">

  <div class="font-[Manrope] text-lg font-extrabold tracking-tight text-[#000f24]">
    My Tasks App
  </div>

  <nav class="hidden md:flex items-center gap-8">
    <a class="font-[Manrope] text-sm font-bold text-slate-500 hover:text-[#000f24] transition-colors" href="#">Dashboard</a>
    <a class="font-[Manrope] text-sm font-bold text-[#000f24] border-b-2 border-[#000f24] pb-1" href="#">Tasks</a>
    <a class="font-[Manrope] text-sm font-bold text-slate-500 hover:text-[#000f24] transition-colors" href="#">Reports</a>
  </nav>

  <div class="flex items-center gap-2">
    <button class="p-2 rounded-full hover:bg-[#000f24]/6 transition-colors">
      <span class="material-symbols-outlined text-[#000f24] text-[20px]">notifications</span>
    </button>
    <button class="p-2 rounded-full hover:bg-[#000f24]/6 transition-colors">
      <span class="material-symbols-outlined text-[#000f24] text-[20px]">account_circle</span>
    </button>
  </div>
</header>
  `
})
export class NavbarComponent {}