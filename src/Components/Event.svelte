<script>
  import { format, formatDistanceToNow } from "date-fns";
  // let selectedDate = format(new Date(), "yyyy, M, d");
  let selectedDate = new Date().toDateString();
  // let selectedDate = "2020-5-2";

  $: fromNow = formatDistanceToNow(new Date(selectedDate), {
    addSuffix: false,
    includeSeconds: true
  });
</script>

<style>

</style>

<input type="date" bind:value={selectedDate} />
<p>
  The selected date is
  <strong>{selectedDate}</strong>
</p>
<p>It is in {fromNow}</p>
