import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { InputTextModule } from 'primeng/inputtext';
import { TaskCardComponent } from "../../../shared/components/card/taskcard.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { FormsModule } from "@angular/forms";
import { TaskService } from "../../../core/services/task.service";
import { Task } from "../../../core/models/task.model";
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule,FormsModule, InputTextModule, TaskCardComponent, NavbarComponent,SidebarComponent],
  template: `
<app-navbar />

<main class="pt-16 min-h-screen flex">

  <app-sidebar />

  <section class="flex-1 p-8">

    <!-- HEADER -->
 <div class="mb-8">
    <h1 class="text-5xl font-extrabold tracking-tight text-[#000e24]-700">Tasks</h1>
    <p class="text-slate-500 text-lg mt-1 leading-relaxed max-w-2xl">
      Manage and track all your tasks in one place.
    </p>
  </div>

    <!-- SEARCH -->
<div class="relative max-w-3xl mb-6">
  <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
    search
  </span>
  <input
    [(ngModel)]="query"
    (input)="search()"
    placeholder="Search by title, description, or keyword..."
    class="custom-search w-full pl-14 pr-6 py-5 
           bg-slate-50 border-none outline-none rounded-xl
           font-[Inter] text-[15px] text-primary placeholder:text-slate-400
           shadow-[0px_12px_32px_rgba(0,15,36,0.06)]
           focus:bg-white focus:shadow-[0px_12px_32px_rgba(0,15,36,0.12)]
           transition-all duration-200"
  />
</div>

    <!-- LIST -->
  <div class="space-y-6">
      @for (task of tasks(); track $index) {

        <app-task-card
          [task]="task">
        </app-task-card>
      }

    </div>

  </section>

</main>
  `
})
export class TasksPageComponent {

  tasks = signal<Task[]>([]);
  query = '';

  constructor(private service: TaskService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next:(r:any) => {
        console.log(r);
        this.tasks.set(r.tasks);
      }
    });
  }

  search() {
    this.service.search(this.query).subscribe({
       next:(r:any) => {
        console.log(r);
        this.tasks.set(r);
      }
    });
  }
}