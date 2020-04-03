<script>
  import { uuid } from "uuidv4";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  import DatePicker from "./Datepicker/DatePicker.svelte";
  import { events } from "../stores.js";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { backInOut } from "svelte/easing";

  const dispatch = createEventDispatcher();

  function closeCreate() {
    dispatch("closeCreate");
  }

  let symbol = "✌️";
  let title = "The Event";
  let tomorrow = dayjs()
    .add(1, "d")
    .startOf("d")
    .toDate();
  let selectedDate = tomorrow;

  const onDateChange = d => {
    selectedDate = d.detail;
  };

  function addEvent() {
    let newEvent = {
      symbol: symbol,
      title: title,
      date: selectedDate,
      id: uuid()
    };
    let updatedEvents = Array.from($events);
    updatedEvents.unshift(newEvent);
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    events.update(current => updatedEvents);
    localStorage.setItem("events", JSON.stringify($events));
    closeCreate();
  }
</script>

<style>
  section {
    /* padding: 80px; */
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
  }
  .container {
    padding: 80px;
    background: #272729;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    place-items: flex-start;
  }
  label {
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: flex-start;
  }
</style>

<section transition:fade={{ duration: 200 }}>
  <div
    class="container"
    in:scale={{ duration: 400, easing: backInOut }}
    out:fade={{ duration: 200 }}>
    <button on:click={closeCreate}>Cancel</button>
    <label>
      🙂
      <input type="text" bind:value={symbol} maxlength="12" />
    </label>
    <label>
      Title
      <input type="text" bind:value={title} maxlength="36" />
    </label>
    <p>Event Date</p>
    <DatePicker
      on:datechange={onDateChange}
      selected={selectedDate}
      isAllowed={date => {
        if (dayjs(date).isAfter(dayjs())) return true;
        return false;
      }} />
    <button on:click={addEvent}>Add event</button>
  </div>
</section>
