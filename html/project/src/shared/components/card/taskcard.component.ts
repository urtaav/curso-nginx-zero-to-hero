import { Component, Input, input } from "@angular/core";
import { Task } from "../../../core/models/task.model";
import { DatePipe } from "@angular/common";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports:[DatePipe,ButtonModule],
  template: `
<div class="group bg-slate-50 hover:bg-white hover:shadow-[0px_12px_32px_rgba(0,15,36,0.09)] 
            transition-all duration-300 p-8 rounded-2xl flex justify-between items-center gap-6">

  <div class="space-y-2.5 flex-1">
    <!-- <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-[1.5px] rounded-sm font-[Inter]">
        {{ task.category ?? 'Task' }}
      </span>
      <span class="font-[Inter] text-xs font-medium text-slate-400">{{ task.id }}</span>
    </div> -->

    <h2 class="font-[Manrope] text-xl font-bold text-primary group-hover:text-primary transition-colors">
      {{ task.title }}
    </h2>

    <p class="font-[Inter] text-sm text-slate-500 leading-relaxed max-w-xl">
      {{ task.description }}
    </p>

    <div class="flex items-center gap-5 pt-1">
      <span class="font-[Inter] text-[11px] font-medium text-slate-400 flex items-center gap-1">
        <i class="pi pi-calendar text-[14px]"></i>
        {{ task.createdAt | date:'MMM dd, yyyy' }}
      </span>
      <!-- <span class="font-[Inter] text-[11px] font-medium text-slate-400 flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">person</span>
        {{ task.assignedTo ?? 'Unassigned' }}
      </span> -->
    </div>
  </div>

  <button pButton label="View Details"
    class="bg-primary! border-primary! text-white! 
           font-[Manrope]! text-[11px]! font-bold! uppercase! tracking-[1.5px]! 
           px-6! py-3! rounded-lg! hover:bg-primary-hover! active:scale-[0.97]! 
           transition-all! shadow-[0px_8px_24px_rgba(0,15,36,0.18)]!">
  </button>
</div>
  `
})
export class TaskCardComponent {
    @Input() task!: Task;
}