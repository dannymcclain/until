<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  import DatePicker from "./Datepicker/DatePicker.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function newEvent() {
    dispatch("newEvent", {
      symbol: symbol,
      title: title,
      date: selectedDate
    });
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
</script>

<style>

</style>

<input type="text" bind:value={symbol} />
<input type="text" bind:value={title} />

<DatePicker
  on:datechange={onDateChange}
  selected={selectedDate}
  isAllowed={date => {
    if (dayjs(date).isAfter(dayjs())) return true;
    return false;
  }} />
<button on:click={newEvent}>Add event</button>
