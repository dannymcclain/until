<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  import { createEventDispatcher } from "svelte";
  import { scale, slide } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { events } from "../stores.js";

  const dispatch = createEventDispatcher();

  export let symbol, title, date, id;

  $: timeFromNow = dayjs(date).fromNow();

  function deleteEvent() {
    let updatedEvents = Array.from($events);
    let updatedEventList = updatedEvents.filter(entry => {
      return entry.id != id;
    });
    events.update(current => updatedEventList);
    localStorage.setItem("events", JSON.stringify($events));
  }
</script>

<style>
  section {
    background: #272729;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    place-items: center;
    /* Fun but dumb 
    transform: scale(1); 
    transition: transform 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55); */
  }
  /* section:hover {
    transform: scale(1.1);
  } */
  .content {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding: 0 0 20px 0;
  }
  h4 {
    font-weight: 900;
    font-size: 40px;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    color: #18181a;
    text-align: center;
  }
  h2 {
    font-weight: 800;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 8px;
  }
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    color: #74747a;
    margin-bottom: 20px;
  }
  h3 {
    padding: 8px 16px;
    background: #3a3a3d;
    border-radius: 14px;
    font-weight: bold;
    font-size: 12px;
    line-height: 1;
    color: #ffffff;
  }
  button {
    padding: 6px 8px;
    background: #272729;
    border: 1px solid #4e4e52;
    border-radius: 4px;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    color: #7e7e85;
    align-self: flex-end;
    cursor: pointer;
    transition: border-color 150ms linear, color 150ms linear;
  }
  button:hover {
    border-color: #74747a;
    color: #a5a5ad;
  }
</style>

<section transition:scale={{ duration: 600, easing: backInOut }}>
  <button on:click={deleteEvent}>Delete</button>
  <div class="content">
    <h4>{symbol}</h4>
    <h2>{title}</h2>
    <p>{dayjs(date).format('MMM D, YYYY')}</p>
    <h3>{timeFromNow}</h3>
  </div>
</section>
