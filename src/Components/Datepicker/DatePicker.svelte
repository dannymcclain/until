<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "./Calender.svelte";
  import { getMonthName } from "./date-time.js";

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = () => true;
  export let selected = new Date();

  // state
  let date, month, year, showDatePicker;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    showDatePicker = true;
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const onDateChange = d => {
    showDatePicker = false;
    dispatch("datechange", d.detail);
  };
</script>

<style>
  .relative {
    position: relative;
    z-index: 100;
  }
  .box {
    z-index: 100;
    background: #fff;
    position: absolute;
    top: 40px;
    left: 0px;
    border: 1px solid #f5f5f5;
    display: inline-block;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    font-weight: 800;
    width: 100%;
  }

  button {
    font-weight: 800;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
    /* border: 1px solid #ccc; */
    border: none;
    background: #eee;
    padding: 4px 8px;
    cursor: pointer;
    transition: background 200ms linear;
  }
  button:hover {
    background: #ddd;
  }
</style>

<div class="relative">
  <input type="text" on:focus={onFocus} value={selected.toDateString()} />
  {#if showDatePicker}
    <div class="box">
      <div class="header">
        <button on:click={prev}>←</button>
        <div>{getMonthName(month)} {year}</div>
        <button on:click={next}>→</button>
      </div>
      <Calender
        {month}
        {year}
        date={selected}
        {isAllowed}
        on:datechange={onDateChange} />
    </div>
  {/if}
</div>
