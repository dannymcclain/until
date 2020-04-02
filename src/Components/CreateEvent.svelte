<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);
  import DatePicker from "./Datepicker/DatePicker.svelte";

  let title = "The Event";
  let tomorrow = dayjs()
    .add(1, "d")
    .startOf("d")
    .toDate();
  let selectedDate = tomorrow;

  const onDateChange = d => {
    selectedDate = d.detail;
  };

  $: fromNow = dayjs(selectedDate).fromNow();
</script>

<style>

</style>

<input type="text" bind:value={title} />

<DatePicker
  on:datechange={onDateChange}
  selected={selectedDate}
  isAllowed={date => {
    if (dayjs(date).isAfter(dayjs())) return true;
    return false;
  }} />

<p>{title} is {fromNow}</p>
