<template>
  <header>
    <router-link id="home" to="/"><h1>Lumiplay</h1></router-link>
    <nav>
      
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
    
  </header>
  <main>
    <router-view />
  </main>
</template>
<style scoped>
h1{
  margin-bottom: 0;
  font-size: 2rem;
}
header {
  display: flex;
  flex-direction: row;
  align-items: center ;
  height: 4rem;
  background-color: black;
  color: #fff;
  font-size: 1.1rem;
  font-family: "Outfit", serif;
  padding-left: 2rem;
}
nav {
  column-gap: 2rem;
  margin-bottom: 0;
  margin-left: 2rem;
  display: flex;
  align-items: center;
}
nav a {
  text-decoration: none;
  color: #fff;
}
#home{
  text-decoration: none;
  color: #fff;

}
</style>
