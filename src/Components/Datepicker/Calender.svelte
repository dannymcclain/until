<script>
  import { getDateRows, uuid, noop } from "./date-time.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // props
  export let date;
  export let month;
  export let year;
  export let isAllowed;

  // local vars to help in render
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let cells;

  // function helpers
  const onChange = date => {
    dispatch("datechange", new Date(year, month, date));
  };

  const allow = (year, month, date) => {
    if (!date) return true;
    return isAllowed(new Date(year, month, date));
  };

  $: cells = getDateRows(month, year).map(c => ({
    value: c,
    allowed: allow(year, month, c)
  }));
</script>

<style>
  .container {
    font-size: 16px;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(7, minmax(32px, 1fr));
    grid-gap: 0;
  }

  .cell {
    display: inline-flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    /* margin: 1px; */
  }

  .selected {
    background: #000;
    color: #fff;
    border-radius: 20px;
  }

  .highlight {
    transition: background 200ms linear, color 175ms linear;
    border-radius: 20px;
  }

  .disabled {
    cursor: not-allowed;
    color: #bfbfbf;
  }

  .highlight:hover {
    background: #eee;
    color: #000;
    cursor: pointer;
  }
  .selected.highlight:hover {
    background: #000;
    color: #fff;
  }
  .days {
    font-weight: 800;
    font-size: 14px;
  }
</style>

<div class="container">
  <div class="row">
    {#each weekdays as day}
      <div class="cell days">{day}</div>
    {/each}
  </div>

  <div class="row">
    {#each cells as { allowed, value } (uuid())}
      <div
        on:click={allowed && value ? onChange.bind(this, value) : noop}
        class:cell={true}
        class:highlight={allowed && value}
        class:disabled={!allowed}
        class:selected={new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(year, month, value).getTime()}>
        {value || ''}
      </div>
    {/each}
  </div>
</div>
