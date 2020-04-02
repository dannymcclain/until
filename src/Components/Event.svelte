<script>
  import moment from "moment";
  import Datepicker from "svelte-calendar";
  let title = "Tomorrow";
  let tomorrow = moment()
    .add(1, "d")
    .toDate();
  let selectedDate = tomorrow;
  $: fromNow = moment(selectedDate).fromNow();
</script>

<style>

</style>

<input type="text" bind:value={title} />
<Datepicker bind:selected={selectedDate} start={tomorrow} />

<p>{title} is {fromNow}</p>
