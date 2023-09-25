import React, { Component } from "react";
import { Button } from "reactstrap";
import { formatCitizenId, numberFormat } from "./Utility";
import thai from "thai-data";
import Select from "react-select";
import Swal from "sweetalert2";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      firstName: "",
      lastName: "",
      citizenId: "",
      email: "",
      houseNo: "",
      villageNo: "",
      lane: "",
      subDistrict: "",
      subDistrictOptions: [],
      district: "",
      province: "",
      postcode: "",
      address: {},
      options: [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePostCode = this.handlePostCode.bind(this);
    this.handleSubDistrict = this.handleSubDistrict.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handlePostCode(e) {
    const value = e.target.value;
    this.setState({ postcode: numberFormat(value) });

    const getAutoSuggestion = thai.getDataForZipCode(Number(value));

    if (getAutoSuggestion.subDistrictList && getAutoSuggestion.subDistrictList.length > 0) {
      const subDistrictOptions = getAutoSuggestion.subDistrictList.map((sub) => ({ value: sub.subDistrictId, label: sub.subDistrictName }));
      this.setState({ subDistrictOptions });
    } else {
      this.setState({ subDistrictOptions: [], subDistrict: "", address: {} });
    }
  }

  handleSubDistrict(value) {
    const getAutoSuggestion = thai.getAutoSuggestion(this.state.postcode, value.label);
    this.setState({ subDistrict: value, district: getAutoSuggestion.districtName, province: getAutoSuggestion.provinceName });
  }

  handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...this.state, subDistrict: this.state.subDistrict.label }),
    };

    fetch("http://localhost:5095/api/users/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data :> ", data);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            text: "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data.errorMessage || data.title,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div style={{ display: "flex", paddingTop: 12, paddingBottom: 6 }}>
            <label style={{ flex: 1 }}>
              คำนำหน้า<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="title" required value={this.state.title} onChange={(e) => this.handleChange("title", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              ชื่อ<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="firstName" required value={this.state.firstName} onChange={(e) => this.handleChange("firstName", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              นามสกุล<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="lastName" required value={this.state.lastName} onChange={(e) => this.handleChange("lastName", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              เลขประจำตัวประชาชน<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              style={{ flex: 3 }}
              name="citizenId"
              required
              maxLength={16}
              value={formatCitizenId(this.state.citizenId)}
              onChange={(e) => this.handleChange("citizenId", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              อีเมล<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} type="email" name="email" required value={this.state.email} onChange={(e) => this.handleChange("email", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              เบอร์โทรศัพท์<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              style={{ flex: 3 }}
              name="phoneNumber"
              required
              maxLength={10}
              value={this.state.phoneNumber}
              onChange={(e) => this.handleChange("phoneNumber", numberFormat(e.target.value))}
            />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              บ้านเลขที่<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="houseNo" required value={this.state.houseNo} onChange={(e) => this.handleChange("houseNo", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>หมู่:</label>
            <input style={{ flex: 3 }} name="villageNo" value={this.state.villageNo} onChange={(e) => this.handleChange("villageNo", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>ซอย:</label>
            <input style={{ flex: 3 }} name="lane" value={this.state.lane} onChange={(e) => this.handleChange("lane", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>ถนน:</label>
            <input style={{ flex: 3 }} name="road" value={this.state.road} onChange={(e) => this.handleChange("road", e.target.value)} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              รหัสไปรษณีย์<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="postcode" required maxLength={5} value={this.state.postcode} onChange={this.handlePostCode} />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              ตำบล<span style={{ color: "red" }}>*</span>:
            </label>
            <div style={{ flex: 3 }}>
              <Select style={{ width: "100%" }} placeholder="เลือกตำบล" options={this.state.subDistrictOptions} value={this.state.subDistrict} onChange={this.handleSubDistrict} />
            </div>
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              อำเภอ<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="district" value={this.state.district} readOnly />
          </div>
          <div style={{ display: "flex", padding: "6px 0" }}>
            <label style={{ flex: 1 }}>
              จังหวัด<span style={{ color: "red" }}>*</span>:
            </label>
            <input style={{ flex: 3 }} name="province" value={this.state.province} readOnly />
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <Button type="submit" color="success">
              บันทึก
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
