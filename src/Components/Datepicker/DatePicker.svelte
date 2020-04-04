<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "./Calender.svelte";
  import { getMonthName } from "./date-time.js";
  import dayjs from "dayjs";
  import { slide } from "svelte/transition";
  import { backInOut } from "svelte/easing";

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
    top: 48px;
    left: -56px;
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
  .close {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  input {
    font-size: 16px;
    padding: 16px;
    font-weight: 800;
    min-width: 0;
    flex: auto;
    outline: none;
    border: 2px solid #3a3a3d;
    background: transparent;
    transition: border-color 200ms linear;
    color: #fff;
  }
  input:focus {
    border-color: #fff;
  }
</style>

<div class="relative">
  <input
    type="text"
    on:focus={onFocus}
    value={dayjs(selected).format('MMM D, YYYY')} />
  {#if showDatePicker}
    <div class="box" transition:slide={{ duration: 400, easing: backInOut }}>
      <div class="close">
        <button on:click={() => (showDatePicker = false)}>×</button>
      </div>
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
