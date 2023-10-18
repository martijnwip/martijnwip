import React, { Component } from "react";
import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Label,
  Modal,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Martijn Wip"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "3em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "1em",
      }}
    />
    <Header
      as="h2"
      content="React & Next.js Developer"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "0.5em",
      }}
    />
    <Button inverted color="red">
      <Icon name="react" /> React
    </Button>
    <Button inverted color="orange">
      <Icon name="python" />
      Python
    </Button>
    <Button inverted color="yellow">
      <Icon name="sass" />
      Sass
    </Button>
    <Button inverted color="olive">
      <Icon name="node js" />
      NodeJS
    </Button>
    <Button inverted color="green">
      <Icon name="database" />
      Postgres
    </Button>
    <Button inverted color="teal">
      <Icon name="aws" />
      AWS
    </Button>
    {/* <Button 
        primary
        size='huge'
        style={{marginBottom:'1 em'}}
    >
      Freelance
      <Icon name='right arrow' />
    </Button> */}
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 300, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a" href="#aboutme">
                  About me
                </Menu.Item>
                <Menu.Item as="a" href="#frontend">
                  Front End
                </Menu.Item>
                <Menu.Item as="a" href="cv_martijnwip_.pdf" target="_blank">
                  Resumé
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as="a"
                    href="https://www.linkedin.com/in/martijn-wip-48330b8/"
                    target="_blank"
                    inverted={!fixed}
                  >
                    <Icon name="linkedin" /> LinkedIn
                  </Button>
                  <Button
                    as="a"
                    href="cv_martijnwip.pdf"
                    target="_blank"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Resumé
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => this.setState({ sidebarOpened: false })}
              href="#aboutme"
            >
              About me
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => this.setState({ sidebarOpened: false })}
              href="#frontend"
            >
              Front End
            </Menu.Item>
            <Menu.Item as="a" href="cv_martijnwip.pdf" target="_blank">
              Resumé
            </Menu.Item>
            {/* <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    {/* <Button as='a' inverted>
                      Log in
                    </Button> */}
                    <Button
                      as="a"
                      href="https://www.linkedin.com/in/martijn-wip-48330b8/"
                      target="_blank"
                      inverted
                      style={{ marginLeft: "0.5em" }}
                    >
                      <Icon name="linkedin" />
                      LinkedIn
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const FrameworkModal = ({ framework }) => {
  const [open, setOpen] = React.useState(false);

  const frameworks = {
    django: {
      color: "violet",
      description:
        "I have experience with setting up a  project on AWS. The architecture is scalable, secure, resilient, and facilitates zero-downtime deployments.<br> The workflows are based on GitLab Flow to automate processes and speed up deployments.\n<br>Terraform is used to easily create and destroy environments to keep costs at a minimum.<br> This to avoid the AWS bill shock.",
      tags: [
        "nginx",
        "api",
        "pipelines",
        "Docker",
        "Postgres",
        "Redis",
        "Travis",
        "CI/CD",
        "TDD",
        "GitLab",
        "AWS",
        "EC2",
        "ALB",
        "ECS",
        "ECR",
        "VPC",
        "S3",
        "Infrastructure as Code",
      ],
    },
    laravel: {
      color: "purple",
      description:
        "Laravel is the first backend framework I worked with. I was surprised how fast I could pick this and start to develop  a full backend system for mydailymoves.nl",
      tags: ["PHP", "Eloquent", "MySQL", "Apache", "API", "PHPUnit"],
    },
    node: {
      color: "pink",
      description:
        "For Jalt I developed a Reporting System for their Facebook business Manager.<br>Besides this project , I developed a small training analytics application with is connected with Strava.",
      tags: ["Express", "Sequelize", "OAuth2", "Facebook API", "Strava"],
    },
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="large"
      trigger={
        <Button color={frameworks[framework]["color"]}>Read more</Button>
      }
    >
      <Modal.Header>Back-end Framework</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header style={{ textTransform: "Capitalize" }}>{framework}</Header>
          <p
            dangerouslySetInnerHTML={{
              __html: frameworks[framework]["description"],
            }}
          ></p>
          {frameworks[framework]["tags"].map((tag) => (
            <Label key={tag}>{tag}</Label>
          ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const Homepage = () => {
  return (
    <ResponsiveContainer>
      <Segment id="aboutme" style={{ padding: "6em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                About me
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Full Stack Developer adapt in all stages of advanced web
                development. Knowledgeable in user interface, testing and
                debugging processes. Bringing forth expertise in design, testing
                and maintenance of web systems.
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                More then twenty years of experience
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Equipped with a diverse and promising skill-set. Proficient in
                an assortment of technologies, including React, Django, Laravel,
                Typescript, Python and Microsoft SQL Server, MySql and Nginx.
                Able to effectively self-manage during independent projects, as
                well as collaborate in a team setting.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image rounded size="medium" src="me.png" circular />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment id="frontend" inverted style={{ padding: "6em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header
                inverted
                textAlign="center"
                as="h3"
                style={{ fontSize: "2.3em" }}
              >
                Front End Development
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              {/* <Image rounded size='medium' src='react.png' circular /> */}
              <Icon name="react" color="purple" size="massive" />
            </Grid.Column>
            <Grid.Column width={4}>
              <List bulleted>
                <List.Item style={{ color: "#D95C5C" }}>React</List.Item>
                <List.Item style={{ color: "#E07B53" }}>
                  Higher Order Components
                </List.Item>
                <List.Item style={{ color: "#F2C61F" }}>
                  Redux / Redux Form
                </List.Item>
                <List.Item style={{ color: "#b5cc18" }}>
                  React Transitions Group
                </List.Item>
                <List.Item style={{ color: "#21ba45" }}>
                  Styled Components / CSS Modules
                </List.Item>
                <List.Item style={{ color: "#00b5ad" }}>
                  CSS / Sass / BEM
                </List.Item>
                <List.Item style={{ color: "#3B83C0" }}>
                  Testing / Jest / Enzyme
                </List.Item>
                <List.Item style={{ color: "#6435c9" }}>Semantic UI</List.Item>
                <List.Item style={{ color: "#a333c8" }}>
                  Redux Thunk / Async Redux
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <p style={{ fontSize: "1.33em", paddingLeft: "1em" }}>
                I have worked with many front-end technologies. Started my
                carees as a Flash Developer. But with the introdcution of the
                frameworks by Google and Facebook I first switched to Angular
                and Ionic to develop mobile apps. I realized however that the
                React and React Native technology are more popular I decided to
                switch to React.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                <Icon name="python" />
                Django
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                I have developed several API's with the Django REST Framework.
                Together with a devops infrastructure on Gitlab and AWS.
              </p>
              <FrameworkModal framework="django" />
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                <Icon name="laravel" />
                Laravel
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                In my role as a Full Stack developer at the GGD/Amsterdam I
                worked with Laravel.
              </p>
              <FrameworkModal framework="laravel" />
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                <Icon name="node js" />
                NodeJS
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                For{" "}
                <a href="https://jalt.nl/" target="_blank" rel="noreferrer">
                  Jalt
                </a>{" "}
                I developed a Reporting System for their Facebook business
                Manager.
              </p>
              <FrameworkModal framework="node" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment inverted style={{ padding: "6em 0em" }} vertical>
        <Container text textAlign="center">
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="sass" />
          </Header>
          <div style={{ padding: "1em 0em" }}>
            {" "}
            I am fully comfortable with all modern day CSS techniques and work
            according the BEM methodology.
          </div>
          <p>
            <Label>Sass</Label>
            <Label>Flexbox</Label>
            <Label>CSS Grid</Label>
            <Label>Animations</Label>
            <Label>Selectors</Label>
            <Label>Mixins</Label>
          </p>
          <p>
            <Label>Functions</Label>
            <Label>Extends</Label>
            <Label>The 7-1 rule</Label>
            <Label>Component-based design</Label>
          </p>
        </Container>
      </Segment>

      <Segment style={{ padding: "6em 0em" }} vertical textAlign="center">
        <Grid columns="equal" container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" className="ui icon dividing  header">
                {/* <Icon name="user" inverted circular={true} /> */}
                <div className="content">
                  Work
                  <div className="sub header">
                    Summary of my work as an employer or freelance
                  </div>
                </div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h4 className="ui dividing inverted header">Employers</h4>
              <List>
                <List.Item>Freelance</List.Item>
                <List.Item>GGD Amsterdam</List.Item>
                <List.Item>Fonk Amsterdam</List.Item>
                <List.Item>Sanoma</List.Item>
                <List.Item>USMedia</List.Item>
                <List.Item>Media Republic</List.Item>
                <List.Item>Ogilvy</List.Item>
                <List.Item>FreelanceFirm</List.Item>
                <List.Item>NFP</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4 className="ui dividing inverted header">Projects </h4>
              <List>
                <List.Item>GGD Malaria App</List.Item>
                <List.Item>MyDailyMoves</List.Item>
                <List.Item>Tandenland App / GroeiGids</List.Item>
                <List.Item>Jalt Campaign Reports</List.Item>
                <List.Item>Sportrusten.nl</List.Item>
                <List.Item>Fixico</List.Item>
                <List.Item>Ikea</List.Item>
                <List.Item>Ford Nederland</List.Item>
                <List.Item>Tommy Hilfiger</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <h4 className="ui dividing inverted header">More </h4>
              <List>
                <List.Item>Nuon</List.Item>
                <List.Item>Red Bull</List.Item>
                <List.Item>Tempo Team</List.Item>
                <List.Item>Andrelon</List.Item>
                <List.Item>KPN</List.Item>
                <List.Item>HVA</List.Item>
                <List.Item>and much more</List.Item>
                <List.Item>&nbsp;</List.Item>
                <List.Item></List.Item>
                <List.Item></List.Item>
                <List.Item></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a" href="https://github.com/flyingwip/">
                    <i className="github inverted icon"></i>Github
                  </List.Item>
                  <List.Item as="a">
                    <Icon name="mail" inverted />
                    [martijnwip](@)[gmail][com]
                  </List.Item>
                  <List.Item as="a">
                    <Icon name="twitter" inverted />
                    Twitter
                  </List.Item>
                  <List.Item as="a">
                    <Icon name="instagram" />
                    Instagram
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Frontend Development</List.Item>
                  <List.Item as="a">Full Stack Development</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Martijn Wip
                </Header>
                <div>Full Stack Developer</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  );
};

export default Homepage;
