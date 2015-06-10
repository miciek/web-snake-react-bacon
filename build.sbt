name := """web-snake"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb).settings(
  PlayKeys.requireJs += "main.js"
)

includeFilter in (Assets, LessKeys.less) := "*.less"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

Keys.fork in Test := false

scalaVersion := "2.11.6"

// Basic dependencies
libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws
)

// WebJars
libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.3.0-2",
  "org.webjars" % "react" % "0.13.0",
  "org.webjars" % "baconjs" % "0.7.18",
  "org.webjars.bower" % "bacon.jquery" % "0.4.11",
  "org.webjars.bower" % "bacon.model" % "0.1.12",
  "org.webjars" % "underscorejs" % "1.8.2",
  "org.webjars" % "jquery" % "2.1.3"
)
