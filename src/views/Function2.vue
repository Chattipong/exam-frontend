<template>
  <DefaultTemplate>
    <div class="content">
      <div id="function-page">
        <h2 class="mg-0 text-center color-main">Test Function 2</h2>
        <div class="box-detail-date">
          <el-date-picker
            v-model="timeDefault"
            type="datetime"
            class="mg-b-5 w-100"
            placeholder="กรุณาเลือกวันและเวลา"
          >
          </el-date-picker>
          <div v-if="timeDefault">
            <p>
              <span>Full Date Time :</span>
              {{ timeDefault | formatDateFull }}
            </p>
            <p>
              <span>รูปแบบปฏิทินไทย :</span>
              {{ timeDefault | formatDateTH }}
            </p>
            <p>
              <span>จำนวนวันในเดือนนี้ :</span>
              {{ timeDefault | formatDaysInMonth }}
            </p>
            <p>
              <span>ไตรมาตรของเดือนนี้ :</span>
              {{ timeDefault | formatQuarter }}
            </p>
            <p>
              <span>Unix timestamp :</span>
              {{ timeDefault | formatTimeStamp }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DefaultTemplate>
</template>

<script>
import DefaultTemplate from "@/template/DefaultTemplate";

export default {
  components: {
    DefaultTemplate,
  },
  data() {
    return {
      timeDefault: "2020-08-10T14:54:52+07:00",
    };
  },
  methods: {},
};
</script>
