import React, { Component } from "react";
import {
  Button,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
// import DatePicker from "react-datepicker";
// import "../../voucher/form/node_modules/react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import "./css/EditForm.css";
import { uploadImage } from "../../../api/media";
import { updateSite, getAllSite } from "../../../redux/site/action";
import { getAllCategory } from "../../../redux/category/action";
import { getAllDistrict } from "../../../redux/district/action";

class SiteEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      site_category_id: "",
      district_id: "",
      image_url: "",
      address: "",
      address_latitude: "",
      address_longitude: "",
      description: "",
      file: null,
      folder: "sites",
      collapse: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let {
      id,
      name,
      category,
      district,
      image_url,
      address,
      address_latitude,
      address_longitude,
      description,
    } = nextProps.site;
    this.setState({
      id,
      site_category_id: category[0].id,
      district_id: district[0].id,
      name,
      image_url,
      address,
      address_latitude,
      address_longitude,
      description,
    });
  }

  async componentWillMount() {
    let {
      id,
      category,
      district,
      name,
      image_url,
      address,
      address_latitude,
      address_longitude,
      description,
    } = this.props.site;
    this.setState({
      id,
      site_category_id: category[0].id,
      district_id: district[0].id,
      name,
      image_url,
      address,
      address_latitude,
      address_longitude,
      description,
    });
    const token = await window.localStorage.getItem("userToken");
    await this.props.fetchAllCategories(token);
    await this.props.fetchAllDistricts(token);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  onImageUploadSubmit = async () => {
    const token = await window.localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("folder", this.state.folder);
    return await uploadImage(formData, token);
  };

  onSave = async (e) => {
    let imageUrl = this.props.site.image_url;
    if (this.state.file) {
      var url = await this.onImageUploadSubmit();
      imageUrl = url.data.data;
    }
    e.preventDefault();
    const token = await window.localStorage.getItem("userToken");
    const {
      id,
      site_category_id,
      district_id,
      name,
      address,
      address_latitude,
      address_longitude,
      description,
    } = this.state;
    await this.props.onUpdateSite(
      {
        id,
        site_category_id,
        district_id,
        name,
        image: imageUrl,
        address,
        address_latitude,
        address_longitude,
        description,
      },
      token
    );
    await this.props.fetchSites(token);
  };

  render() {
    const {
      site_category_id,
      district_id,
      name,
      image_url,
      address,
      address_latitude,
      address_longitude,
      description,
    } = this.state;
    const { categories } = this.props.categoryData;
    const { districts } = this.props.districtData;
    return (
      <ModalBody>
        <Form encType="multipart/form-data" onSubmit={this.onSave}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              defaultValue={name}
              onChange={this.onChange}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="6">
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  defaultValue={address}
                  onChange={this.onChange}
                  required
                ></Input>
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
                    />
                    <Label className="custom-file-label">Choose</Label>
                  </div>
                </div>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs="6">
                <Label>Address Latitude</Label>
                <Input
                  type="text"
                  name="address_latitude"
                  defaultValue={address_latitude}
                  onChange={this.onChange}
                  required
                />
              </Col>
              <Col xs="6">
                <Label>Address Latitude</Label>
                <Input
                  type="text"
                  name="address_longitude"
                  defaultValue={address_longitude}
                  onChange={this.onChange}
                  required
                />
              </Col>
            </Row>
          </FormGroup>
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label for="site_category_id">Site Category</Label>
                <select
                  name="site_category_id"
                  className="form-control"
                  defaultValue={site_category_id}
                  onChange={this.onChange}
                  required
                >
                  <option>Choose Category</option>
                  {categories.map((category, index) => {
                    return (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="district_id">District</Label>
                <select
                  name="district_id"
                  className="form-control"
                  defaultValue={district_id}
                  onChange={this.onChange}
                  required
                >
                  <option>Choose District</option>
                  {districts.map((district, index) => {
                    return (
                      <option key={index} value={district.id}>
                        {district.name}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  defaultValue={description}
                  onChange={this.onChange}
                  required
                ></Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <img src={image_url} alt="demo" className="img" />
            </Col>
          </Row>
          <hr></hr>
          <Button color="success" style={{ float: "right" }}>
            Save
          </Button>
        </Form>
      </ModalBody>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.category,
    districtData: state.district,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSite: (site, token) => {
      dispatch(updateSite(site, token));
    },
    fetchSites: (token) => {
      dispatch(getAllSite(token));
    },
    fetchAllCategories: (token) => {
      dispatch(getAllCategory(token));
    },
    fetchAllDistricts: (token) => {
      dispatch(getAllDistrict(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteEditForm);
