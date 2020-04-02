<script>
  import Header from "./Components/Header.svelte";
  import About from "./Components/About.svelte";
  import Event from "./Components/Event.svelte";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Until</h1>
  <Event />
  <Event />
</main>
