import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import "./css/VoucherAddForm.css";
import { addNewVoucher, getAllVoucher } from "../../../redux/voucher/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImage } from "../../../api/media";
import { convertDate } from "../../../utils/formater";

class VoucherAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      voucher_code: "",
      sale_voucher: "",
      start_date: new Date(),
      expired_date: new Date(),
      description: "",
      file: null,
      folder: "vouchers",
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  onImageUploadSubmit = async (e) => {
    const token = await window.localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("folder", this.state.folder);
    return await uploadImage(formData, token);
  };

  onSave = async (e) => {
    e.preventDefault();
    this.toggle();
    const token = await window.localStorage.getItem("userToken");
    var res = await this.onImageUploadSubmit();
    const {
      name,
      voucher_code,
      sale_voucher,
      start_date,
      expired_date,
      description,
    } = this.state;
    await this.props.onAddVoucher(
      {
        name,
        image: res.data.data,
        voucher_code,
        sale_voucher,
        start_date: convertDate(start_date),
        expired_date: convertDate(expired_date),
        description,
      },
      token
    );
    this.props.fetchVouchers(token);
  };

  toggle() {
    this.setState((state) => ({
      collapse: !state.collapse,
    }));
  }

  onChangeStartDate = (date) => {
    this.setState({
      start_date: date,
    });
  };

  onChangeExpiredDate = (date) => {
    this.setState({
      expired_date: date,
    });
  };

  render() {
    const {
      name,
      voucher_code,
      sale_voucher,
      start_date,
      expired_date,
      description,
    } = this.state;
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <i className="fas fa-plus-circle" /> Add New Voucher
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Form encType="multipart/form-data" onSubmit={this.onSave}>
                <Row>
                  <Col xs="8">
                    <Row>
                      <Col xs="6">
                        <FormGroup>
                          <Label for="name">Name</Label>
                          <Input
                            type="text"
                            name="name"
                            defaultValue={name}
                            onChange={this.onChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <Label for="exampleFile">Image</Label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                          </div>
                          <div className="custom-file">
                            <Input
                              type="file"
                              className="custom-file-input"
                              id="image"
                              onChange={this.onChangeFile}
                              multiple="multiple"
                              accept="image/*"
                              required
                            />
                            <Label className="custom-file-label">
                              Choose file
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Row>
                          <Col xs="6">
                            <Label for="start_date">Start Date</Label>
                            <br></br>
                            <DatePicker
                              className="form-control"
                              name="start_date"
                              dateFormat="yyyy-MM-dd"
                              selected={start_date}
                              onChange={this.onChangeStartDate}
                            />
                          </Col>
                          <Col xs="6">
                            <Label for="expired_date">Expired Date</Label>
                            <br></br>
                            <DatePicker
                              className="form-control"
                              name="expired_date"
                              dateFormat="yyyy-MM-dd"
                              selected={expired_date}
                              onChange={this.onChangeExpiredDate}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="6">
                        <Row>
                          <Col xs="6">
                            <Label for="name">Voucher Code</Label>
                            <Input
                              type="text"
                              name="voucher_code"
                              defaultValue={voucher_code}
                              onChange={this.onChange}
                              required
                            />
                          </Col>
                          <Col xs="6">
                            <Label for="name">Sale Voucher</Label>
                            <Input
                              type="number"
                              name="sale_voucher"
                              defaultValue={sale_voucher}
                              onChange={this.onChange}
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="4">
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label for="description">Description</Label>
                          <Input
                            type="textarea"
                            rows="1"
                            name="description"
                            id="description"
                            value={description}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" className="mt-20 float-right">
                        <Button
                          type="submit"
                          color="success"
                          className="custom-width mr-10"
                        >
                          <i className="fas fa-check-circle" /> Add
                        </Button>
                        <Button
                          color="danger"
                          onClick={this.toggle}
                          className="custom-width"
                        >
                          <i className="fa fa-ban" /> Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddVoucher: (voucher, token) => {
      dispatch(addNewVoucher(voucher, token));
    },
    fetchVouchers: (token) => {
      dispatch(getAllVoucher(token));
    },
  };
};

export default connect(null, mapDispatchToProps)(VoucherAddForm);
