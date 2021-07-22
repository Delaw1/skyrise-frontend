import React, { Component, Fragment } from 'react'

export class Footer extends Component {
    render() {
        return (
            <Fragment>
                 <footer>
    <div class="container-fluid">


      <div class="row">
        <div class="col-md-4">
          <h2>
            LINKS
          </h2>
          <span class="m-bt">
            Services
          </span>

          <a href="#" class="m-b"> For builders & developers</a>
          <a href="#" class="m-b"> For buyers & investors</a>
          <a href="#" class="mb-4"> For sellers</a>


          <span class="m-bt"> New projects</span>
          <a href="" class="m-b">
            Commercial space
          </a>
          <a href="" class="m-b">
            Condos
          </a>
          <a href="" class="m-b">
            Detached homes
          </a>
          <a href="" class="mb-4">
            Townhomes
          </a>

          <span class="m-bt">
            MLS
          </span>
          <a href="">
            MLS search
          </a>
        </div>

        <div class="col-md-4 mt-4 mt-md-0">
          <h2>
            CONNECT
          </h2>
          <div class="row">
            <div class="col-1 col-md-3 col-lg-2 pt-2">
              <div class="w-100">
                <img src="images/youtube.png" alt="" width="30" height="23" />

              </div>
              <div class="w-100 mt-4 pt-1">
                <img src="images/inst.png" width="30" height="30" class=" mt-4" alt="" />

              </div>
              <div class="w-100 mt-3 mt-lg-3 pt-2 pt-md-2">
                <img width="30" height="30" src="images/fb.png" class=" mt-4" alt="" />

              </div>
              <div class="w-100 mt-4 mt-lg-3 pt-2 ">
                <img src="images/tw.png" class=" mt-4" width="30" height="30" alt="" />

              </div>
              <div class="w-100 mt-4 mt-lg-4 ">
                <img src="images/in.png" class=" mt-4" width="30" height="30" alt="" />

              </div>
            </div>
            <div class="col-9 pl-4 pl-md-0 col-md-9 col-lg-10">
              <span>
                Youtube
              </span>
              <a href="#" class="mb-4">34,668 followers</a>

              <span>
                Instagram
              </span>
              <a href="#" class="mb-4">
                2332 followers
              </a>
              <span>
                Facebook
              </span>
              <a href="#" class="mb-4">

                4318 followers

              </a>
              <span>
                Twitter
              </span>
              <a href="#" class="mb-4">


                9345 followers


              </a>

              <span>
                LinkedIn
              </span>
              <a href="#" class="mb-4">


                7349 followers


              </a>



            </div>
          </div>

        </div>

        <div class="col-md-4">
          <h2>
            CONTACT
          </h2>
          <span>
            Phone
          </span>

          <a href="#" class="mb-4"> (604) 805 - 8888</a>


          <span> Email</span>

          <a href="" class="mb-4">
            hello@skyriseprojects.com
          </a>

          <span>
            Newsletter

          </span>
          <p class="font-s">

            Learn more about Skyrise and new projects
            delivered straight to your inbox.
          </p>

          <div class="row form-div">
            <div class="col-9 col-md-8 col-lg-9 pr-0 form-div">

              <input type="text" class="form-control cont-input" name="" id="" placeholder="Your email address" />
            </div>
            <div class="col-3 col-md-4 col-lg-3 pl-2">
              <button class="btn btn-primary btn-block">
                JOIN
              </button>
            </div>
          </div>

        </div>


      </div>
      <div class="row">
        <div class="col-md-6 side-links">
          <a href="">Legal</a> | <a href="">Terms of use</a> | <a href="">Privacy policy</a>
        </div>
        <div class="col-md-6">

          <p class="text-right">
            © 2020 Skyrise Projects, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
            </Fragment>
        )
    }
}

export default Footer
