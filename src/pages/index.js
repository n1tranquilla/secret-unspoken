import React from 'react'
import Layout from '../components/Layout'
import BlogListItem from '../components/BlogListItem'
import Column from '../components/Column'
import { graphql } from 'gatsby'
import TotalCount from '../components/TotalCount'

import './index.css'
import SplashSection from '../components/SplashSection';

const IndexPage = (props) => (
  <Layout>
    <Column>
      <SplashSection subtitle={props.data.site.siteMetadata.subtitle} />
      <TotalCount count={props.data.allMarkdownRemark.totalCount}/>
      { props.data.allMarkdownRemark.edges.map(({ node })=>(
        <BlogListItem 
          to={node.fields.slug}
          title={node.frontmatter.title} 
          date={node.frontmatter.date} 
          excerpt={node.excerpt}
        />
      )) }
    </Column>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        subtitle
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { eq:"post" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
