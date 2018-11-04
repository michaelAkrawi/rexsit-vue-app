<template>
    <div class="radio-select-container">
        <input :id="id" type="radio" :name="name" :value="label" @input="setRadioState" :checked="checked" >
        <div class="radio-state" :class="skin">
            <i v-if="skin == 'primary'" class="fas fa-check"></i>
            <i v-if="skin == 'danger'" class="fas fa-times"></i>
        </div>
        <label :for="id" :class="skin">
            <slot></slot>
        </label>
        
    </div>
</template>

<style scoped>
.radio-select-container input[type="radio"] {
  visibility: hidden;
  position: absolute;
  opacity: 0;
}

.radio-select-container label {
  height: 100%;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  position: relative;
  cursor: pointer;
  padding: 15px;
  text-align: center;
}

.radio-select-container .radio-state {
  position: absolute;
  display: none;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid;
  z-index: 2;
  right: 0;
  top: -35px;
  text-align: center;
}

.radio-select-container .radio-state.primary {
  border-color: #00d1b2;
}

.radio-select-container .radio-state.danger {
  border-color: #a94442;
}

.radio-select-container .radio-state svg {
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 15px;
}

.fa-check {
  left: 15px;
}

.fa-times {
  left: 17px;
}

.radio-select-container input[type="radio"]:checked + div.radio-state {
  display: block;
}

.radio-select-container input[type="radio"]:checked ~ label.primary {
  border: 2px solid #00d1b2;
}

.radio-select-container input[type="radio"]:checked ~ label.danger {
  border: 2px solid #a94442;
}
</style>

<script>
export default {
  name: "radio-select",
  props: ["value", "id", "name", "label", "skin", "checked"],
  methods: {
    setRadioState() {
      this.$emit("input", this.label);
    }
  }
};
</script>


