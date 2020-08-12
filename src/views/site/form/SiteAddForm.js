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
import { addNewSite, getAllSite } from "../../../redux/site/action";
import { getAllCategory } from "../../../redux/category/action";
import { getAllDistrict } from "../../../redux/district/action";
import { uploadImage } from "../../../api/media";
import "./css/AddForm.css";

class SiteAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      site_category_id: 1,
      district_id: 1,
      image: "",
      address: "",
      address_latitude: 0,
      address_longitude: 0,
      total_rating: "",
      description: "",
      file: null,
      folder: "sites",
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  async componentWillMount() {
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
      site_category_id,
      district_id,
      address,
      address_latitude,
      address_longitude,
      description,
    } = this.state;
    await this.props.onAddSite(
      {
        name,
        image: res.data.data,
        site_category_id,
        district_id,
        address,
        address_latitude,
        address_longitude,
        total_rating: 0,
        description,
      },
      token
    );
    await this.props.fetchSites(token);
  };

  toggle() {
    this.setState((state) => ({
      collapse: !state.collapse,
    }));
  }

  render() {
    const {
      name,
      site_category_id,
      district_id,
      address,
      address_latitude,
      address_longitude,
      description,
    } = this.state;
    const { categories } = this.props.categoryData;
    const { districts } = this.props.districtData;
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <i className="fas fa-plus-circle" /> Add New Site
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
                            <FormGroup>
                              <Label for="address_latitude">
                                Address Latitude
                              </Label>
                              <Input
                                type="number"
                                name="address_latitude"
                                defaultValue={address_latitude}
                                onChange={this.onChange}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup>
                              <Label for="address_longitude">
                                Address Longitude
                              </Label>
                              <Input
                                type="number"
                                name="address_longitude"
                                defaultValue={address_longitude}
                                onChange={this.onChange}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="6">
                        <Row>
                          <Col xs="6">
                            <FormGroup>
                              <Label for="site_category_id">
                                Site Category
                              </Label>
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
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="4">
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label for="address">Address</Label>
                          <Input
                            type="text"
                            name="address"
                            value={address}
                            onChange={this.onChange}
                            required
                          />
                        </FormGroup>
                      </Col>
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
                    </Row>
                    <Row>
                      <Col xs="12">
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

const mapStateToProps = (state) => {
  return {
    categoryData: state.category,
    districtData: state.district,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSite: (site, token) => {
      dispatch(addNewSite(site, token));
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteAddForm);
