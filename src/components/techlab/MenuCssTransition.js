import React from 'react'
import { CSSTransition } from 'react-transition-group';
// A simple JavaScript utility for conditionally joining classNames together.
import cx from 'classnames';

import './MenuAnimation.css'

class MenuAnimation extends React.Component {

    state = {
        showBalloon: true,
    };
    
    toggle = () => {
        this.setState(prevState => ({
            showBalloon: !prevState.showBalloon,
            highlightedMenuItem: false,
        }));
    };    

    toggleHighlightedMenuItem = () => {
        this.setState(state => ({
          highlightedMenuItem: !state.highlightedMenuItem,
        }));
      };    

    render(){
        return (
            <div className="container">
              <button
                className={cx('toggler', {
                  'toggler--active': this.state.showBalloon,
                })}
                onClick={this.toggle}
              >
                Menu
              </button>

              {/* There are 4 main states a Transition can be in:

            'entering'
            'entered'
            'exiting'
            'exited' */}

              <CSSTransition
                // in is a boolean value that is going to 
                // control the appearance of the component
                in={this.state.showBalloon}
                // the amount of milliseconds it will take to enter or leave
                timeout={350}
                classNames="balloon"
                // this means it will leave the dom completely
                unmountOnExit
                // show animation on page load
                appear
                // Disable RTG enter and/or exit Transitions using the `enter`, and `exit` Props
                // enter={false}
                // exit={false}
                onEnter={()=>console.log('onEnter')}
                onEntering={()=>console.log('onEntering')}
                onEntered={this.toggleHighlightedMenuItem}
                onExit={this.toggleHighlightedMenuItem}               
                onExiting={()=>console.log('onExiting')}               
                onExited={()=>console.log('onExited')}               

              >
                <div className="top-menu">
                  <ul className="list">
                    <li className="list-item">Home</li>
                    <li
                        className={cx('list-item', {
                        'list-item--active': this.state
                            .highlightedMenuItem,
                        })}
                    >
                        Profile
                    </li>
                    <li className="list-item">Favorites</li>
                    <li className="list-item">Sign out</li>
                  </ul>
                </div>
              </CSSTransition>
            </div>
          );
    }
}

export default MenuAnimation