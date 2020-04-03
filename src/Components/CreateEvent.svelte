<script>
  import { uuid } from "uuidv4";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  import DatePicker from "./Datepicker/DatePicker.svelte";
  import { events } from "../stores.js";

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
  }
</script>

<style>
  section {
    padding: 80px;
  }
</style>

<section>
  <input type="text" bind:value={symbol} />
  <input type="text" bind:value={title} />

  <DatePicker
    on:datechange={onDateChange}
    selected={selectedDate}
    isAllowed={date => {
      if (dayjs(date).isAfter(dayjs())) return true;
      return false;
    }} />
  <button on:click={addEvent}>Add event</button>
</section>
