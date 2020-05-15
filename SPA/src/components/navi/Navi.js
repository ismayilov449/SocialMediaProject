import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/userActions";
import { history } from "../../redux/services/helper/history";
import { bindActionCreators } from "redux";

import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import "../posts/PostStyle.css";
import "../navi/NaviStyle.css";

class Navi extends Component {
  state = {
    isOpen: false,
    logged: false,
    user: null,
    foundedUsers: [],
  };

  componentDidMount() {
    var currUser = JSON.parse(localStorage.getItem("user")) ?? null;
    this.setState({ user: currUser });
    this.setState({ foundedUsers: this.props.actions.find() });

    //console.log(this.props.user);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <div className="post">
            <NavbarBrand>
              <Link to="/home">Home</Link>
            </NavbarBrand>
            {/* {console.log(this.props.user)} */}
            {/* <Collapse navbar> */}
            {/* <Nav className="mr-auto" navbar> */}
            <Nav>
              {/* {console.log(this.props.user)} */}
              {this.props.user === undefined ? (
                <div></div>
              ) : (
                <div>
                  <NavItem>
                    {this.props.user.user !== undefined ? (
                      <div className="navi">
                          <Input
                            type="text"
                            placeholder="Find users"
                            size="sm"
                            style={{ marginTop: "8px" }}
                            onChange={(e) => {
                              this.props.actions.find(e.target.value);
                              console.log(this.props.users);
                            }}
                          ></Input>
                        <NavLink>
                          <ButtonDropdown
                            toggle={() => this.toggle()}
                            isOpen={this.state.isOpen}
                          >
                            <DropdownToggle outline color="info" size="sm">
                              {this.props.user.user.username}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>
                                <Link
                                  size="sm"
                                  onClick={() => {
                                    this.props.actions.logout();
                                    history.push("/");
                                  }}
                                  to=""
                                >
                                  Logout
                                </Link>{" "}
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </NavLink>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </NavItem>
                </div>
              )}

              {/* <CartSummary></CartSummary> */}
            </Nav>
            {/* </Collapse> */}
          </div>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authenticationReducer.user,
    users: state.foundedUsersReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(userActions.logout, dispatch),
      find: bindActionCreators(userActions.find, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
