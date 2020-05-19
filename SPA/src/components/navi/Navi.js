import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/userActions";
import { history } from "../../redux/services/helper/history";
import { bindActionCreators } from "redux";

import {
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
  PopoverHeader,
  Popover,
  PopoverBody,
} from "reactstrap";
import { connect } from "react-redux";
import "../posts/PostStyle.css";
import "../navi/NaviStyle.css";
import { render } from "@testing-library/react";

class Navi extends Component {
  state = {
    isOpen: false,
    popoverOpen: false,
    logged: false,
    user: null,
    foundedUsers: [],
    username: "",
  };

  componentDidMount() {
    var currUser = JSON.parse(localStorage.getItem("user")) ?? null;
    this.setState({ user: currUser });
    this.props.actions.find();
    this.setState({ popoverOpen: false });
    //console.log(this.props.user);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  togglePopOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  handleSubmit(e) {
    this.props.actions.find(this.state.username);
  }

  dropdownMenu() {
    this.render();
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
                  <NavItem id="nav">
                    {this.props.user.user !== undefined ? (
                      <div className="navi">
                        <Input
                          className="input"
                          type="text"
                          name="username"
                          id="text"
                          placeholder="Find users"
                          autoComplete="off"
                          onChange={(e) => {
                            if (e.target.value.length > 0) {
                              this.props.actions.find(e.target.value);
                              this.setState({ foundedUsers: this.props.users });
                            } else {
                              this.setState({ foundedUsers: [] });
                            }
                          }}
                        />
                        {this.state.foundedUsers !== undefined ? (
                          <Popover
                            placement="bottom"
                            isOpen={this.state.popoverOpen}
                            target="text"
                            toggle={() => this.togglePopOver()}
                            trigger="legacy"
                          >
                            {this.state.foundedUsers.length > 0 ? (
                              <div>
                                <PopoverHeader>Founded users</PopoverHeader>
                                <PopoverBody divider></PopoverBody>

                                {this.state.foundedUsers.map((user) => (
                                  <PopoverBody>
                                    <Link
                                      to={"/profile/" + user.username}
                                      onClick={() => {
                                        var url = "/profile/" + user.username;
                                        history.push(url);
                                      }}
                                    >
                                      {user.username}
                                    </Link>
                                  </PopoverBody>
                                ))}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </Popover>
                        ) : (
                          <div></div>
                        )}
                        <NavLink>
                          <ButtonDropdown
                            toggle={() => this.toggle()}
                            isOpen={this.state.isOpen}
                          >
                            <DropdownToggle outline color="info">
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
    users: state.foundedUsersReducer.users,
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
