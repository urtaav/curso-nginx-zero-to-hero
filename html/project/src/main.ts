import { Component, inject, OnInit, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ],
  template: `
<div class="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-10 font-sans">
  <header class="max-w-6xl mx-auto mb-12 text-center">
    <div class="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
      NGINX Reverse Proxy Course
    </div>
    <h1 class="text-5xl font-black tracking-tight text-white mb-4">
      API <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Gateway</span> Dashboard
    </h1>
    <p class="text-slate-400 max-w-2xl mx-auto">
      Consumiendo microservicios internos y APIs externas mediante ruteo dinámico de NGINX.
    </p>
  </header>

  <main class="max-w-6xl mx-auto space-y-10">
    
    <section>
      <div class="flex items-center space-x-2 mb-6 border-l-4 border-blue-500 pl-4">
        <h2 class="text-2xl font-bold text-white">Servicios Internos</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-lg font-bold text-blue-400">User Microservice</h3>
              <p class="text-xs text-slate-500 font-mono mt-1">Endpoint: /api/users</p>
            </div>
            <div class="p-2 bg-blue-500/10 rounded-lg text-blue-400 italic font-black">JSON</div>
          </div>
          <div class="bg-slate-900 rounded-lg p-4 mb-4 border border-slate-800">
             <code class="text-xs text-emerald-400 leading-relaxed">{{ users() | json }}</code>
          </div>
          <button (click)="fetchUsers()" class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition-all active:scale-95">
            Refrescar Instancia
          </button>
        </div>

        <div class="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-lg font-bold text-emerald-400">Product Microservice</h3>
              <p class="text-xs text-slate-500 font-mono mt-1">Endpoint: /api/products</p>
            </div>
            <div class="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 italic font-black">DATA</div>
          </div>
          <div class="bg-slate-900 rounded-lg p-4 mb-4 border border-slate-800">
            <code class="text-xs text-emerald-400 leading-relaxed">{{ products() | json }}</code>
          </div>
          <button (click)="fetchProducts()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all active:scale-95">
            Refrescar Catálogo
          </button>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center space-x-2 mb-6 border-l-4 border-purple-500 pl-4">
        <h2 class="text-2xl font-bold text-white">APIs Externas (JSONPlaceholder)</h2>
      </div>
      <div class="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
        <div class="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/30">
          <span class="text-purple-400 font-mono text-sm">GET /api/external/posts</span>
          <button (click)="fetchExternalPosts()" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold transition">
            Consumir API Externa
          </button>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (post of posts(); track post.id) {
            <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <h4 class="text-purple-300 text-sm font-bold mb-2 truncate">{{ post.title }}</h4>
              <p class="text-slate-500 text-xs line-clamp-2">{{ post.body }}</p>
            </div>
          } @empty {
            <div class="col-span-3 text-center py-10 text-slate-600 italic">No hay posts cargados.</div>
          }
        </div>
      </div>
    </section>

  </main>

  <footer class="fixed bottom-8 left-1/2 -translate-x-1/2">
    <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-2 rounded-full shadow-2xl flex items-center space-x-4">
      <button (click)="counter.set(counter() - 1)" class="w-12 h-12 bg-slate-700 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-all text-xl">-</button>
      <div class="text-center min-w-[80px]">
        <span class="block text-[10px] uppercase text-slate-500 font-bold">Estado Global</span>
        <span class="text-xl font-black text-white">{{ counter() }}</span>
      </div>
      <button (click)="counter.set(counter() + 1)" class="w-12 h-12 bg-slate-700 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-full transition-all text-xl">+</button>
    </div>
  </footer>
</div>
  `,
})
export class App implements OnInit {
  private http = inject(HttpClient);
  
  // Signals para el estado
  counter = signal(0);
  users = signal<any>(null);
  products = signal<any>(null);
  posts = signal<any>(null);

  ngOnInit() {
    this.fetchUsers();
    this.fetchProducts();
  }

  fetchUsers() {
    // Nota: Usamos rutas relativas, NGINX se encarga del resto
    this.http.get('/api/users').subscribe(data => this.users.set(data));
  }

  fetchProducts() {
    this.http.get('/api/products').subscribe(data => this.products.set(data));
  }

  fetchExternalPosts() {
    // Petición 1 a través del proxy
    this.http.get<any[]>('/api/external/posts').subscribe(res => {
      this.posts.set(res.slice(0, 10)); // Solo tomamos 5
    });
  }
}

bootstrapApplication(App, {
  providers:[
    provideHttpClient(
         withFetch(),
    )
  ]
});
