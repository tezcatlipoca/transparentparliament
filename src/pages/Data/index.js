import React from 'react';
import { connect } from 'react-redux';
import styles from './Data.module.css';
import PropTypes from 'prop-types';
import { makeAssetURL } from 'utility';
class Data extends React.Component {
  fileListing = (filename, size) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.fileName}>
          <a href={makeAssetURL(`data/hansard/${filename}`)}>{filename}</a>
        </div>
        <div className={styles.fileSize}>{size}</div>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.content}>
        <div>
          <div className={styles.title}>Data</div>
        </div>

        <div>
          {this.fileListing('hansard_justnine_12192019.csv', '3.9GB')}
          {this.fileListing(
            'databaseExport_02_23_2020-21-59-46.sql.gz',
            '901.7MB'
          )}
          {this.fileListing('tokenized_hansard.csv', '64.2GB')}
          {this.fileListing(
            'databaseExport_02_23_2020-04-45-55.sql.gz',
            '5.7GB'
          )}
          <hr></hr>
          {this.fileListing('classes.csv', '15.8KB')}
          {this.fileListing('collaborative_cities.csv', '159.2KB')}
          {this.fileListing('collaborative_nations.csv', '295.2KB')}
          {this.fileListing('concerns.csv', '51.2KB')}
          {this.fileListing('hansard_justnine_12192019.csv', '3.9GB')}
          {this.fileListing('nation_pairs_in_titles.csv', '220.0KB')}
          {this.fileListing('offices.csv', '34.7KB')}
          {this.fileListing('phenomenadict.csv', '74.6KB')}
          {this.fileListing('slavery.csv', '31B')}
          {this.fileListing('speakers_data_02062020.csv', '2.6GB')}
          {this.fileListing('tokenized_hansard.csv', '64.2GB')}
          {this.fileListing(
            'total_nations_counts_in_debate_titles.csv',
            '59.4MB'
          )}
          {this.fileListing('traitdict.csv', '614.9KB')}
          {this.fileListing(
            'unlemmatized_sentencecounts_withyear_0192020.csv',
            '4.0GB'
          )}
          {this.fileListing('wordnet-phenomena.csv', '52.3KB')}
          {this.fileListing('wordnet-traits.csv', '436.2KB')}
        </div>
      </div>
    );
  }
}

Data.propTypes = {
  reduxState: PropTypes.object
};

export default connect(reduxState => {
  return {
    reduxState
  };
})(Data);
