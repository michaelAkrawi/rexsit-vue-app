<template>
    <div class="checkbox-container">
        <input :id="id" type="checkbox" class="form-control" >
        <i class="fas fa-check"></i>   
        <label>{{description}}</label>    
    </div>
    
</template>

<script>
export default {
  name: "checkbox-vue",
  props: ["id", "description"],
  data() {
    return {
      checked: false
    };
  },
  methods: {
    onClick() {
      this.checked = !this.checked;
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

.checkbox-container label {
  margin-right: 30px;
}

.checkbox-container {
  content: "";
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  width: 25px;
  height: 25px;
  display: inline-block;
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




