import React, { Component } from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
  import { v4 as uuidv4 } from 'uuid';
  
  import './MenuListTransitionGroup.css';
  
class MenuListTransitionGroup extends Component {
    items = [
        {
        name: 'Potato',
        id: uuidv4(),
        },
        {
        name: 'Carrot',
        id: uuidv4(),
        },
        {
        name: 'Pepper',
        id: uuidv4(),
        },
        {
        name: 'Eggplant',
        id: uuidv4(),
        },
        {
        name: 'Onion',
        id: uuidv4(),
        },
        {
        name: 'Garlic',
        id: uuidv4(),
        },
    ];

    state = {
        favorites: [],
    };

    toggleInFavorites = id => {
        let favorites;
        const isItemInFavorites = this.state.favorites.find(
          favorite => favorite.id === id
        );
        if (isItemInFavorites) {
          // Item is already in favorites, remove it.
          favorites = this.state.favorites.filter(
              favorite => favorite.id !== id
          );
          } else {
          // Item is not in favorites, add it.
          favorites = [
              ...this.state.favorites,
              this.items.find(item => id === item.id),
          ];
        }
        this.setState({ favorites });
    };

    render() {
        return (
        <div className="container">
            <ul className="ingredients">
            {this.items.map(({ id, name }) => (
                <li
                key={id}
                className="ingredient"
                onClick={() =>
                    this.toggleInFavorites(id)
                }
                >
                {name}
                <span className="star">
                    {this.state.favorites.find(
                    favorite => favorite.id === id
                    )
                    ? '★'
                    : '☆'}
                </span>
                </li>
            ))}
            </ul>
            <div className="favorites">
            <p>My Favorites:</p>
            <TransitionGroup component="ol">
                {this.state.favorites.map(
                ({ id, name }) => (
                    <CSSTransition
                    timeout={500}
                    classNames="fade"
                    key={id}
                    >
                    <li className="favorite">{name}</li>
                    </CSSTransition>
                )
                )}
            </TransitionGroup>
            </div>
        </div>
        );
    }
}

export default MenuListTransitionGroup;

