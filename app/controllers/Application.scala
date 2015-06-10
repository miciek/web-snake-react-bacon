package controllers

import play.api.Logger
import play.api.mvc._

object Application extends Controller {
  val log = Logger("application")

  def index = Action { Ok(views.html.index("Let's make a game!")) }
}