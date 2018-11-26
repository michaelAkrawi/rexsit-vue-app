<template>
    <div>
      <div class="checkbox-container">
        <input :id="id" type="checkbox"  class="form-control" @change="updateState($event.target.checked)" :checked="checked" >
        <i class="fas fa-check"></i>           
      </div>
      <div class="label-container">
        <label :for="id"><slot></slot></label>    
      </div>
    </div>
    
</template>

<script>
export default {
  name: "checkbox-vue",
  props: ["value", "id", "checked"],
  data() {
    return {
      state: this.checked
    };
  },
  methods: {
    updateState(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.checkbox-container input[type="checkbox"] {
  opacity: 0;
  height: 25px;
  z-index: 2;
  position: absolute;
  cursor: pointer;
}

.label-container label {
  padding-right: 10px;
  font-weight: 600;
  margin-bottom: 0;
}

.label-container {
  display: table-cell;
  position: relative;  
}

.checkbox-container {
  content: "";
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  width: 25px;
  height: 25px;
  display: table-cell;
  position: relative;
}

.checkbox-container svg {
  position: absolute;
  display: none;
  top: 7px;
  right: 5px;
  font-size: 12px;
  color: #00d1b2;
  z-index: 1;
  font-weight: 700;
}

.checkbox-container input[type="checkbox"]:checked + svg {
  display: inline;
}
</style>




