<script>
  import dayjs from "dayjs";
  import Header from "./Components/Header.svelte";
  import About from "./Components/About.svelte";
  import CreateEvent from "./Components/CreateEvent.svelte";
  import Event from "./Components/Event.svelte";
  import { events } from "./stores.js";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { backInOut, backOut, quintInOut } from "svelte/easing";

  onMount(() => {
    const data = JSON.parse(localStorage.getItem("events"));
    if (data) {
      events.update(entry => data);
    }
  });
</script>

<style>
  :global(body) {
    background: #0c0c0d;
  }
  main {
    padding: 1em;
    margin: 0 auto;
  }
  .event-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  @media (min-width: 540px) {
    main {
      max-width: 700px;
    }
    .event-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 40px;
    }
  }
</style>

<main>
  <h1>Until</h1>
  <CreateEvent />

  <section class="event-grid">
    {#if $events.length === 0}
      <h2>Create an event to get started</h2>
    {:else}
      {#each $events as { symbol, title, date, id } (id)}
        <div animate:flip={{ delay: 200, duration: 400, easing: quintInOut }}>
          <Event {symbol} {title} {date} {id} />
        </div>
      {/each}
    {/if}
  </section>
</main>
