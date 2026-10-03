<template>
  <div id="app">
    <header>
      <!-- Top Navigation -->
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    <div class="layout">
      <!-- Sidebar for Filtering -->
      <aside class="sidebar">
        <h3>Filter</h3>
        <!-- ...existing code... -->
      </aside>
      <main class="main-content">
        <h2>Categories</h2>
        <div class="categories">
          <!-- ...existing code... -->
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.layout {
  display: flex;
}
.sidebar {
  width: 250px; /* Adjust as needed */
  background-color: #f4f4f4;
  padding: 15px;
}
.main-content {
  flex-grow: 1;
  padding: 15px;
}
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 15px;
}
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .categories {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile */
  }
}
</style>