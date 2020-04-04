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
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    right: 0;
    padding: 80px 0 0 0;
  }
  .container {
    padding: 40px 20px 20px;
    background: #272729;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    place-items: flex-start;
    position: relative;
  }
  label {
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: flex-start;
    font-weight: bold;
    font-size: 12px;
    line-height: 1;
    color: #a5a5ad;
    font-size: 16px;
    width: 100%;
  }
  input {
    font-size: 16px;
    padding: 16px;
    font-weight: 800;
    min-width: 0;
    flex: auto;
    outline: none;
    /* border: 2px solid #3a3a3d; */
    /* border: 2px solid #4e4e52; */
    border: none;
    background: #3a3a3d;
    transition: border-color 200ms linear;
    color: #fff;
    width: 100%;
    border-radius: 4px;
  }
  input:focus {
    border-color: #fff;
  }
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    height: 40px;
    width: 40px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .close svg path {
    transition: stroke 200ms linear;
  }
  .close:hover svg path {
    stroke: #fff;
  }
</style>

<section transition:fade={{ duration: 200 }}>
  <div
    class="container"
    in:scale={{ duration: 400, easing: backInOut }}
    out:fade={{ duration: 200 }}>
    <button class="close" on:click={closeCreate}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1L11 11M11 1L1 11"
          stroke="#6B6B70"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
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
      showDatePicker={true}
      on:datechange={onDateChange}
      selected={selectedDate}
      isAllowed={date => {
        if (dayjs(date).isAfter(dayjs())) return true;
        return false;
      }} />
    <button on:click={addEvent}>Add event</button>
  </div>
</section>
