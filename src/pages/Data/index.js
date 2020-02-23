import React from 'react';
import { connect } from 'react-redux';
import styles from './Data.module.css';
import PropTypes from 'prop-types';
import { makeAssetURL } from 'utility';
class Data extends React.Component {
  fileListing = (filename, size) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ minWidth: '30rem' }}>
          <a href={makeAssetURL(`data/hansard/${filename}`)}>{filename}</a>
        </div>
        <div>{size}</div>
      </div>
    );
  };

  render() {
    console.log(this.props.reduxState);
    return (
      <div className={styles.content}>
        <div>
          <div className={styles.title}>Data</div>
        </div>

        <div>
          <p>
            - Data pairs Source:
            https://assets.democracylab.io/data/hansard/hansard_justnine_12192019.csv
            Database:
            https://assets.democracylab.io/data/hansard/databaseExport_02_23_2020-21-59-46.sql.gz
            Source:
            https://assets.democracylab.io/data/hansard/tokenized_hansard.csv
            Database:
            https://assets.democracylab.io/data/hansard/databaseExport_02_23_2020-04-45-55.sql.gz{' '}
            <a href="https://docs.democracylab.io/docs/welcome.html">
              documention
            </a>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            auctor tempus est id vestibulum. Nullam tincidunt luctus ligula at
            lacinia. Maecenas sit amet aliquam ante. Praesent aliquet mi a risus
            venenatis aliquam. Fusce tristique ut elit in hendrerit. Nulla ut
            diam tellus. Nam sed tincidunt quam. Vestibulum felis sem, malesuada
            a risus luctus, tincidunt viverra est.
          </p>
          <p>
            In at malesuada erat, at ultricies lacus. Vivamus ac eros tempor,
            viverra dui sit amet, convallis urna. Ut vitae tellus nec sapien
            vulputate aliquam quis in purus. Proin eleifend enim lectus,
            tincidunt tristique tortor gravida eu. Aliquam nulla mi, bibendum id
            tempus non, aliquam eu ante. In sed orci nec libero imperdiet
            fermentum vitae vel nisi. Ut ullamcorper, quam at congue mattis,
            purus felis vulputate neque, at pretium sapien tortor ac justo. Nunc
            vel tortor elementum, sollicitudin justo sed, viverra augue. Cras
            consectetur ullamcorper ante ut mattis. Donec finibus purus et ante
            tristique mattis. Donec mollis ligula eu sapien euismod, non
            molestie nisl pretium. Maecenas leo sem, faucibus sed dictum a,
            tincidunt quis nibh. Aliquam eget velit tempor, sollicitudin sem
            vel, consequat sem. Praesent ac augue sed augue vehicula aliquam sit
            amet et lacus. Suspendisse sodales, massa in vulputate porta, justo
            felis ornare risus, sit amet iaculis orci purus in lacus. Nulla
            facilisi. Nunc pulvinar ultrices finibus. Mauris ipsum sem, porta
            eget tincidunt vel, egestas quis metus. Nam orci enim, eleifend sit
            amet auctor sed, viverra ut felis. Mauris vehicula vel dui id
            faucibus. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. In id felis justo. Praesent tempor, risus a tempor
            tristique, nibh lacus ultricies diam, sit amet accumsan lorem enim
            in ante.
          </p>
          <p>
            Vestibulum iaculis lorem vel lorem fringilla venenatis. Pellentesque
            quis scelerisque lorem, sit amet euismod nisl. Proin porta, lorem
            sit amet mollis malesuada, justo sem auctor erat, ut euismod arcu
            sapien ut dui. Mauris et pulvinar sapien. Integer pulvinar luctus
            ipsum, eget porta sapien lacinia eget. Etiam consectetur turpis eu
            erat sodales, et sodales ipsum volutpat. Morbi ornare dui sed
            scelerisque venenatis. Donec vestibulum nec purus vel pellentesque.
            Aenean mauris ipsum, egestas id semper at, placerat eget quam.
          </p>
          {this.fileListing('classes.csv', 99999)}
          {this.fileListing('collaborative_cities.csv', 99999)}
          {this.fileListing('collaborative_nations.csv', 99999)}
          {this.fileListing('concerns.csv', 99999)}
          {this.fileListing('hansard_justnine_12192019.csv', 99999)}
          {this.fileListing('nation_pairs_in_titles.csv', 99999)}
          {this.fileListing('offices.csv', 99999)}
          {this.fileListing('phenomenadict.csv', 99999)}
          {this.fileListing('slavery.csv', 99999)}
          {this.fileListing('speakers_data_02062020.csv', 99999)}
          {this.fileListing('tokenized_hansard.csv', 99999)}
          {this.fileListing('total_nations_counts_in_debate_titles.csv', 99999)}
          {this.fileListing('traitdict.csv', 99999)}
          {this.fileListing(
            'unlemmatized_sentencecounts_withyear_0192020.csv',
            99999
          )}
          {this.fileListing('wordnet-phenomena.csv', 99999)}
          {this.fileListing('wordnet-traits.csv', 99999)}
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
