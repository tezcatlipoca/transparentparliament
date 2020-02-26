import React from 'react';
import PropTypes from 'prop-types';
import saveSvg from 'save-svg-as-png';
import styles from './Exportable.module.css';
import IconButton from 'components/IconButton';

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    orientation: 'portrait',
    margin: 20
  },
  view: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: 'white'
  },
  image: {
    objectFit: 'contain'
  },
  bodyCopy: {
    width: '50%',
    fontSize: 10
  }
});

export default class Exportable extends React.Component {
  state = { url: null, pdfDoc: null, exportReady: false };

  pngExport = () => {
    const svg = document.querySelector('#visualization > svg:first-of-type');
    if (svg) saveSvg.saveSvgAsPng(svg, `${this.props.fileName}.png`);
  };

  generatePdf = () => {
    const paperSize = 'A4';
    const orientation = 'landscape';
    const svg = document.querySelector('#visualization > svg:first-of-type');
    if (svg)
      saveSvg.svgAsPngUri(svg).then(uri => {
        this.setState({
          exportReady: true,
          pdfDoc: (
            <Document>
              <Page
                style={pdfStyles.page}
                size={paperSize}
                orientation={orientation}
              >
                <View style={pdfStyles.view}>
                  <Text>Facets of Parliamentary Speech</Text>
                  <Text style={pdfStyles.bodyCopy}></Text>
                </View>
              </Page>
              <Page
                object-fit="fill"
                style={pdfStyles.page}
                size={paperSize}
                orientation={orientation}
              >
                <View style={pdfStyles.view}>
                  <Image style={pdfStyles.image} src={uri} alt="images" />
                </View>
              </Page>
            </Document>
          )
        });
      });
  };

  download = (content, fileName, contentType) => {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  componentDidMount() {
    // Fixme: Should be replaced with an onComplete callback
    setTimeout(this.generatePdf, 1000);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.exportReady && (
          <div className={styles.exportButtonGroup}>
            <div className={styles.exportButtons}>
              {this.state.pdfDoc && (
                <PDFDownloadLink
                  document={this.state.pdfDoc}
                  fileName={`${this.props.fileName}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <IconButton
                        isDisabled={true}
                        tooltip={'Export PDF'}
                        icon="file-pdf"
                      />
                    ) : (
                      <IconButton tooltip={'Export PDF'} icon="file-pdf" />
                    )
                  }
                </PDFDownloadLink>
              )}
              <IconButton
                tooltip={'Export Image'}
                borderless={true}
                onClick={this.pngExport}
                icon="file-image"
              />
              {this.props.data && (
                <IconButton
                  tooltip={'Export Data'}
                  borderless={true}
                  onClick={() => {
                    this.download(
                      JSON.stringify(this.props.data),
                      `${this.props.fileName}.json`,
                      'text/plain'
                    );
                  }}
                  icon="file-download"
                />
              )}
            </div>
          </div>
        )}
        {this.props.children}
      </React.Fragment>
    );
  }
}

Exportable.defaultProps = {
  fileName: 'export'
};

Exportable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fileName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
