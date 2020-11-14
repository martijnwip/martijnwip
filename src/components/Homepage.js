
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'

import {
  Button,
  Container,
  Divider,
  Grid,
  GridColumn,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Label,
  Transition
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Martijn Wip'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '1em',
      }}
    />
    <Header
      as='h2'
      content='React & Django Developer'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '0.5em',
      }}
    />
    <Button inverted color='red'>
      <Icon name='react' />  React
    </Button>
    <Button inverted color='orange'>
      <Icon name='python' />Python
    </Button>
    <Button inverted color='yellow'>
      <Icon name='sass' />Sass
    </Button>
    <Button inverted color='olive'>
      <Icon name='node js' />NodeJS
    </Button>
    <Button inverted color='green'>
      <Icon name='database' />Postgres
    </Button>
    <Button inverted color='teal'>
      <Icon name='aws' />AWS
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
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a' href="#aboutme">About me</Menu.Item>
                <Menu.Item as={Link} to="/css-transition">Techlab</Menu.Item>
                <Menu.Item as='a' href="martijn_wip_cv.pdf" target="_blank">Resumé</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' href="https://www.linkedin.com/in/martijn-wip-48330b8/" target="_blank" inverted={!fixed}>
                    <Icon name='linkedin' /> LinkedIn
                  </Button>
                  <Button as='a'
                     href="martijn_wip_cv.pdf" target="_blank" 
                     inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
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
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a' href="#aboutme">About me</Menu.Item>
            <Menu.Item as={Link} to="/css-transition">Techlab</Menu.Item>
            <Menu.Item as='a' href="martijn_wip_cv.pdf" target="_blank">Resumé</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {/* <Button as='a' inverted>
                      Log in
                    </Button> */}
                    <Button as='a' href="https://www.linkedin.com/in/martijn-wip-48330b8/" target="_blank" inverted style={{ marginLeft: '0.5em' }}>
                      <Icon name='linkedin' />LinkedIn
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
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Homepage = () => {

  const [backEndInfo, setbackEndInfo] = useState(1)
  console.log(backEndInfo)

  return (<ResponsiveContainer>
    <Segment id="aboutme"  style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              About me
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Full Stack Developer adapt in all stages of advanced web development. Knowledgeable in user interface, testing and debugging processes. Bringing forth expertise in design, testing and maintenance of web systems.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              More then twenty years of experience
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including React, Django, Laravel, Typescript, Python and Microsoft SQL Server, MySql and Nginx. Able to effectively self-manage during independent projects, as well as collaborate in a team setting.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image rounded size='medium' src='me.png' circular />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


    <Segment inverted style={{ padding: '8em 0em'}} vertical>
      <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
          <Grid.Column center>
            <Header inverted textAlign='center' dividing as='h3' style={{ fontSize: '2.3em' }}>
                  Front End Development
            </Header>
        </Grid.Column>
      </Grid.Row>      
      <Grid.Row>
        <Grid.Column width={4}>
          <Image rounded size='medium' src='react.png' circular />
        </Grid.Column>
        <Grid.Column width={4}>
        <List bulleted>
            <List.Item style={{color:'#D95C5C'}}>React</List.Item>
            <List.Item style={{color:'#E07B53'}}>Higher Order Components</List.Item>
            <List.Item style={{color:'#F2C61F'}}>Redux / Redux Form</List.Item>
            <List.Item style={{color:'#b5cc18'}}>React Transitions Group</List.Item>
            <List.Item style={{color:'#21ba45'}}>Styled Components / CSS Modules</List.Item>
            <List.Item style={{color:'#00b5ad'}}>CSS / Sass / BEM</List.Item>
            <List.Item style={{color:'#3B83C0'}}>Testing / Jest / Enzyme</List.Item>
            <List.Item style={{color:'#6435c9'}}>Semantic UI</List.Item>
            <List.Item style={{color:'#a333c8'}}>Redux Thunk / Async Redux</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          <p style={{ fontSize: '1.33em', paddingLeft:'1em' }}>
          I have worked with many front-end technologies. Started my carees as a Flash Developer. But with the introdcution of the frameworks by Google and Facebook 
          I first switched to Angular and Ionic to develop mobile apps. I realized however that the React and React Native technology are more popular I decided to switch to React.
          </p>            
                      
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            <Icon name='python' />Django
            </Header>
            <p style={{ fontSize: '1.33em' }}>The last two years I have worked with Django as my backend technology.</p>
            <Button onClick={ ()=> setbackEndInfo(1) }  color='violet'>
              Read more
            </Button>            
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            <Icon name='laravel' />Laravel
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              In my role as a Full Stack developer at the GGD/Amsterdam I worked with Laravel.
            </p>
            <Button onClick={ ()=> setbackEndInfo(2) }  color='purple'>
              Read more
            </Button>            
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
            <Icon name='node js' />NodeJS
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              For <a href="https://jalt.nl/" target="_blank">Jalt</a> I developed a Reporting System for their Facebook business Manager.
            </p>
            <Button onClick={ ()=> setbackEndInfo(3) }  color='pink'>
              Read more
            </Button>            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


    <Segment style={{ padding: '0em' }} vertical>
      <Grid stackable>

      {/* <Transition.Group
          as={List}
          duration={200}
          divided
        >         */}
      
        <Grid.Row key={1} textAlign='left'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>Django</Header>
            <p style={{ fontSize: '1.33em' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac magna est. Phasellus et pulvinar purus. Pellentesque quis efficitur mi, a consectetur turpis. Nunc auctor luctus ex, vitae pretium nibh egestas sed. Cras cursus nisl ac aliquam commodo. Phasellus viverra velit quam, eget vulputate urna placerat id. 
            </p>
            <Label>Migrations</Label><Label>Nginx</Label><Label>Aws</Label><Label>Docker</Label>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>  
        </Grid.Row>    
        
        <Grid.Row key={2} textAlign='left'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>Laravel</Header>
            <p style={{ fontSize: '1.33em' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac magna est. Phasellus et pulvinar purus. Pellentesque quis efficitur mi, a consectetur turpis. Nunc auctor luctus ex, vitae pretium nibh egestas sed. Cras cursus nisl ac aliquam commodo. Phasellus viverra velit quam, eget vulputate urna placerat id. 
            </p>
            <Label>Migrations</Label><Label>Nginx</Label><Label>Aws</Label><Label>Docker</Label>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>  
        </Grid.Row>

        <Grid.Row key={3} textAlign='left'>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>NodeJS</Header>
            <p style={{ fontSize: '1.33em' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac magna est. Phasellus et pulvinar purus. Pellentesque quis efficitur mi, a consectetur turpis. Nunc auctor luctus ex, vitae pretium nibh egestas sed. Cras cursus nisl ac aliquam commodo. Phasellus viverra velit quam, eget vulputate urna placerat id. 
            </p>
            <Label>Migrations</Label><Label>Nginx</Label><Label>Aws</Label><Label>Docker</Label>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>  
        </Grid.Row>    
        {/* </Transition.Group>   */}
      
    
      </Grid>
    </Segment>    

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard About me, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)}

export default Homepage