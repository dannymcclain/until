<script>
  import { format, formatDistanceToNow } from "date-fns";
  import datepicker from "js-datepicker";
  import { onMount } from "svelte";

  let selection;
  let pickerDate;
  // let pickerInput;
  onMount(() => {
    // console.log("the component has mounted");
    // pickerInput = document.getElementById("pickerInput");
    // console.log(pickerInput);
    const picker = datepicker("#pickerInput");
  });
  // let selectedDate = format(new Date(), "yyyy, M, d");
  // let selectedDate = new Date().toDateString();
  // let selectedDate = "2020-5-2";

  // $: fromNow = formatDistanceToNow(new Date(selectedDate), {
  //   addSuffix: false,
  //   includeSeconds: true
  // });
</script>

<style>

</style>

<!-- <input type="date" bind:value={selection} />
<p>
  The selected date is
  <strong>{selection}</strong>
</p> -->
<input id="pickerInput" type="text" bind:value={pickerDate} />
<p>The pickerDate is {pickerDate}</p>
<!-- <p>It is in {fromNow}</p> -->
