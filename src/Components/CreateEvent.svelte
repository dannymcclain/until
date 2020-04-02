<script>
  import moment from "moment";
  // import Datepicker from "svelte-calendar";
  import DatePicker from "./Datepicker/DatePicker.svelte";

  let title = "Tomorrow";
  let tomorrow = moment()
    .add(1, "d")
    .toDate();
  let selectedDate = tomorrow;

  const onDateChange = d => {
    selectedDate = d.detail;
  };

  $: fromNow = moment(selectedDate).fromNow();
</script>

<style>

</style>

<input type="text" bind:value={title} />

<DatePicker
  on:datechange={onDateChange}
  selected={selectedDate}
  isAllowed={date => {
    if (moment(date).isAfter(moment())) return true;
    return false;
  }} />

<p>{title} is {fromNow}</p>
