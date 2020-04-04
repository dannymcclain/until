<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "./Calender.svelte";
  import { getMonthName } from "./date-time.js";
  import dayjs from "dayjs";

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = () => true;
  export let selected = new Date();

  // state
  let date, month, year;
  export let showDatePicker = true;

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
    showDatePicker = true;
    dispatch("datechange", d.detail);
  };
</script>

<style>
  .box {
    background: #272729;
    border: 2px solid #4e4e52;
    display: inline-block;
    border-radius: 8px;
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

  /* button {
    font-weight: 800;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
    border: none;
    background: #eee;
    padding: 4px 8px;
    cursor: pointer;
    transition: background 200ms linear;
  }
  button:hover {
    background: #ddd;
  } */
  button {
    padding: 6px 8px;
    background: #272729;
    border: 1px solid #4e4e52;
    border-radius: 4px;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    color: #7e7e85;
    align-self: flex-end;
    cursor: pointer;
    transition: border-color 150ms linear, color 150ms linear;
  }
  button:hover {
    border-color: #fff;
    color: #fff;
  }
  button:active {
    border-color: #fff;
    background: transparent;
    color: #fff;
  }
</style>

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
