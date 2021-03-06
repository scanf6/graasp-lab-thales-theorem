/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Stage, Layer, Text } from 'react-konva';

// import { CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT } from '../../config/constants';
import {
  setFractionSpot as setFractionSpotLab,
  unsetFractionSpot as unsetFractionSpotLab,
} from '../../actions';

import Fraction from './fraction';
import './index.css';

class CreateFormula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposedSegments: {
        ae: { x: 0, y: 100 },
        ag: { x: 40, y: 100 },
        ac: { x: 80, y: 100 },
        ad: { x: 120, y: 100 },
        af: { x: 160, y: 100 },
        ab: { x: 200, y: 100 },
        de: { x: 240, y: 100 },
        fg: { x: 280, y: 100 },
        bc: { x: 320, y: 100 },
      },
    };
  }

  snapToClosestPosition = (segment, textLastPosition, text) => {
    const { proposedSegments } = this.state;
    const { setFractionSpot, unsetFractionSpot } = this.props;
    // This method will allow to snap the choosed and dragged segment into the fractions
    if (
      textLastPosition.x >= 53
      && textLastPosition.x <= 93
      && textLastPosition.y >= 13
      && textLastPosition.y <= 53
    ) {
      // fraction1_spot2
      this.setState({
        proposedSegments: {
          ...proposedSegments,
          [segment]: { x: 73, y: 33 },
        },
      });
      setFractionSpot({
        fractionSpot: 'fraction1_spot2',
        valueSpot: text,
      });
    } else if (
      textLastPosition.x >= 53
      && textLastPosition.x <= 93
      && textLastPosition.y >= -20
      && textLastPosition.y <= 20
    ) {
      // fraction1_spot1
      this.setState({
        proposedSegments: {
          ...proposedSegments,
          [segment]: { x: 73, y: 0 },
        },
      });
      setFractionSpot({
        fractionSpot: 'fraction1_spot1',
        valueSpot: text,
      });
    } else if (
      textLastPosition.x >= 123
      && textLastPosition.x <= 163
      && textLastPosition.y >= 13
      && textLastPosition.y <= 53
    ) {
      // fraction2_spo2
      this.setState({
        proposedSegments: {
          ...proposedSegments,
          [segment]: { x: 143, y: 33 },
        },
      });
      setFractionSpot({
        fractionSpot: 'fraction2_spot2',
        valueSpot: text,
      });
    } else if (
      textLastPosition.x >= 123
      && textLastPosition.x <= 163
      && textLastPosition.y >= -20
      && textLastPosition.y <= 20
    ) {
      // fraction2_spo1
      this.setState({
        proposedSegments: {
          ...proposedSegments,
          [segment]: { x: 143, y: 0 },
        },
      });
      setFractionSpot({
        fractionSpot: 'fraction2_spot1',
        valueSpot: text,
      });
    } else {
      // Dispatch unsetFraction here...
      unsetFractionSpot(text);
    }
  };

  handleDragEnd = (e) => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_lastPos"] }] */
    const textLastPosition = e.target._lastPos;
    const nodeText = e.target.partialText;
    if (nodeText === 'AE') {
      this.snapToClosestPosition('ae', textLastPosition, nodeText);
    } else if (nodeText === 'AG') {
      this.snapToClosestPosition('ag', textLastPosition, nodeText);
    } else if (nodeText === 'AC') {
      this.snapToClosestPosition('ac', textLastPosition, nodeText);
    } else if (nodeText === 'AD') {
      this.snapToClosestPosition('ad', textLastPosition, nodeText);
    } else if (nodeText === 'AF') {
      this.snapToClosestPosition('af', textLastPosition, nodeText);
    } else if (nodeText === 'AB') {
      this.snapToClosestPosition('ab', textLastPosition, nodeText);
    } else if (nodeText === 'DE') {
      this.snapToClosestPosition('de', textLastPosition, nodeText);
    } else if (nodeText === 'FG') {
      this.snapToClosestPosition('fg', textLastPosition, nodeText);
    } else if (nodeText === 'BC') {
      this.snapToClosestPosition('bc', textLastPosition, nodeText);
    }
  };

  handleDragMove = (e) => {
    const { x, y } = e.target.attrs;
    const theX = Math.max(-0, Math.min(300, x));
    const theY = Math.max(-0, Math.min(100, y));
    e.target.x(theX);
    e.target.y(theY);
  }

  render() {
    const { theoremApplicable, t, fraction } = this.props;
    const {
      fraction1_spot1, fraction1_spot2, fraction2_spot1, fraction2_spot2,
    } = fraction;
    const { proposedSegments } = this.state;
    const appliedOnCircle = theoremApplicable.circleChoosed === 'circleOne'
      ? { numerator: 'AE', denominator: 'AC' }
      : { numerator: 'AG', denominator: 'AC' };

    return (
      <div className="formulaRoot">
        <h6>{t('Determine the proportionality ratios')}</h6>
        <p>
          {t('Draw the segments concerned and place them in the fractions so as to establish the proportionality ratio of Thales Theorem.')}
        </p>
        <div>
          <Stage
            width={380}
            height={140}
          >
            <Layer>
              <Fraction
                numerator={{ x: 5, text: appliedOnCircle.numerator }}
                denominator={{ x: 5, y: 33, text: appliedOnCircle.denominator }}
                divisor={{ x: -3, y: 25 }}
              />
              <Text text="=" x={42} y={12} fontSize={30} fill="grey" />
              <Fraction
                noColorNum={!!fraction1_spot1}
                noColorDeNom={!!fraction1_spot2}
                numerator={{ x: 73, text: fraction1_spot1 }}
                denominator={{ x: 73, y: 33, text: fraction1_spot2 }}
                divisor={{ x: 65, y: 25 }}
              />
              <Text text="=" x={110} y={12} fontSize={30} fill="grey" />
              <Fraction
                noColorNum={!!fraction2_spot1}
                noColorDeNom={!!fraction2_spot2}
                numerator={{ x: 143, text: fraction2_spot1 }}
                denominator={{ x: 143, y: 33, text: fraction2_spot2 }}
                divisor={{ x: 135, y: 25 }}
              />
              <Text
                y={70}
                fontSize={20}
                fill="black"
                text="Choisir parmis les segment ci-dessous:"
              />

              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.ae.x}
                y={proposedSegments.ae.y}
                text="AE"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.ag.x}
                y={proposedSegments.ag.y}
                text="AG"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.ac.x}
                y={proposedSegments.ac.y}
                text="AC"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.ad.x}
                y={proposedSegments.ad.y}
                text="AD"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.af.x}
                y={proposedSegments.af.y}
                text="AF"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.ab.x}
                y={proposedSegments.ab.y}
                text="AB"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.de.x}
                y={proposedSegments.de.y}
                text="DE"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.fg.x}
                y={proposedSegments.fg.y}
                text="FG"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
              <Text
                draggable
                onDragEnd={this.handleDragEnd}
                onDragMove={this.handleDragMove}
                x={proposedSegments.bc.x}
                y={proposedSegments.bc.y}
                text="BC"
                fill="grey"
                fontSize={18}
                fontStyle="italic"
              />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  theoremApplicable: state.theoremCanApply,
  fraction: state.fraction,
});

const mapDispatchToProps = {
  setFractionSpot: setFractionSpotLab,
  unsetFractionSpot: unsetFractionSpotLab,
};

CreateFormula.propTypes = {
  setFractionSpot: PropTypes.func.isRequired,
  unsetFractionSpot: PropTypes.func.isRequired,
  fraction: PropTypes.shape({}).isRequired,
  theoremApplicable: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CreateFormula);

export default withTranslation()(ConnectedComponent);
