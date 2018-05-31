<?php
//Fill this place
$dbhost = 'localhost';  // mysql服务器主机地址
$dbuser = 'root';// mysql用户名
$dbpass = '';          // mysql用户名密码
$dbname = 'travel';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接错误: ' . mysqli_error($conn));
}

//应该会自动断开链接
//****** Hint ******
//connect database and fetch data here

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css"/>


    <link rel="stylesheet" href="css/captions.css"/>
    <link rel="stylesheet" href="css/bootstrap-theme.css"/>

</head>

<body>
<?php include 'header.inc.php'; ?>


<!-- Page Content -->
<main class="container">
    <div class="panel panel-default">
        <div class="panel-heading">Filters</div>
        <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">
                <div class="form-inline">
                    <select name="continent" class="form-control">
                        <option value="0">Select Continent</option>
                        <?php
                        //Fill this place

                        mysqli_select_db($conn, 'travel');
                        mysqli_query($conn, "set names utf8");
                        $sql_continents = "SELECT ContinentCode, ContinentName, GeoNameId FROM continents";
                        $result = $conn->query($sql_continents) or die($conn->error);


                        //****** Hint ******
                        //display the list of continents

                        while ($row = $result->fetch_assoc()) {
                            echo '<option value=' . $row['ContinentCode'] . '>' . $row['ContinentName'] . '</option>';
                        }
                        ?>
                    </select>

                    <select name="country" class="form-control">
                        <option value="0">Select Country</option>
                        <?php
                        //Fill this place
                        mysqli_select_db($conn, 'travel');
                        mysqli_query($conn, "set names utf8");
                        $sql_countries = "SELECT ISO,CountryName FROM countries";
                        $result = $conn->query($sql_countries) or die($conn->error);
                        //****** Hint ******
                        /* display list of countries */
                        while ($row = $result->fetch_assoc()) {
                            echo '<option value=' . $row['ISO'] . '>' . $row['CountryName'] . '</option>';
                        }
                        ?>
                        ?>
                    </select>
                    <input type="text" placeholder="Search title" class="form-control" name=title>
                    <button type="submit" class="btn btn-primary">Filter</button>
                </div>
            </form>

        </div>
    </div>


    <ul class="caption-style-2">
        <?php
        //Fill this place

        if(isset($_GET['continent'])){
            $continents = htmlspecialchars($_GET['continent']);
            $countries = htmlspecialchars($_GET['country']);

            if ($continents != '0' && $countries != '0') {
//                两个都选了
                mysqli_select_db($conn, 'travel');
                mysqli_query($conn, "set names utf8");
                $sql = 'SELECT ImageID, Title, Description,CountryCodeISO,ContinentCode,Path FROM imagedetails WHERE CountryCodeISO' . '="' . $countries . '" and ContinentCode ="' . $continents . '"';
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    echo '     <li>
              <a href="detail.php?id=' . $row['ImageID'] . '" class="img-responsive">
                <img src="images/square-medium/' . $row['Path'] . '" alt="' . $row['Title'] . '">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>' . $row['Description'] . '</p>
                  </div>
                </div>
              </a>
            </li>        ';
                }
            }

            if ($countries != '0' && $continents === '0') {
//                只选了国家
                mysqli_select_db($conn, 'travel');
                mysqli_query($conn, "set names utf8");
                $sql = 'SELECT ImageID, Title, Description,CountryCodeISO,ContinentCode,Path FROM imagedetails WHERE CountryCodeISO' . '="' . $countries . '"';
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    echo '     <li>
              <a href="detail.php?id=' . $row['ImageID'] . '" class="img-responsive">
                <img src="images/square-medium/' . $row['Path'] . '" alt="' . $row['Title'] . '">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>' . $row['Description'] . '</p>
                  </div>
                </div>
              </a>
            </li>        ';
                }
            }

            if ($continents != '0' && $countries === '0') {
//                只选了洲
                mysqli_select_db($conn, 'travel');
                mysqli_query($conn, "set names utf8");
                $sql = 'SELECT ImageID, Title, Description,CountryCodeISO,ContinentCode,Path FROM imagedetails WHERE ContinentCode' . '="' . $continents . '"';
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    echo '     <li>
              <a href="detail.php?id=' . $row['ImageID'] . '" class="img-responsive">
                <img src="images/square-medium/' . $row['Path'] . '" alt="' . $row['Title'] . '">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>' . $row['Description'] . '</p>
                  </div>
                </div>
              </a>
            </li>        ';
                }
            }

            if ($countries === '0' && $continents === '0') {
//            都没选
                mysqli_select_db($conn, 'travel');
                mysqli_query($conn, "set names utf8");
                $sql = 'SELECT ImageID, Title, Description,CountryCodeISO,ContinentCode,Path FROM imagedetails';
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    echo '     <li>
              <a href="detail.php?id=' . $row['ImageID'] . '" class="img-responsive">
                <img src="images/square-medium/' . $row['Path'] . '" alt="' . $row['Title'] . '">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>' . $row['Description'] . '</p>
                  </div>
                </div>
              </a>
            </li>        ';
                }
            }
        }else{
             mysqli_select_db($conn, 'travel');
                mysqli_query($conn, "set names utf8");
                $sql = 'SELECT ImageID, Title, Description,CountryCodeISO,ContinentCode,Path FROM imagedetails';
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    echo '     <li>
              <a href="detail.php?id=' . $row['ImageID'] . '" class="img-responsive">
                <img src="images/square-medium/' . $row['Path'] . '" alt="' . $row['Title'] . '">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>' . $row['Description'] . '</p>
                  </div>
                </div>
              </a>
            </li>        ';
                }
        }

        //****** Hint ******
        /* use while loop to display images that meet requirements ... sample below ... replace ???? with field data
        <li>
          <a href="detail.php?id=????" class="img-responsive">
            <img src="images/square-medium/????" alt="????">
            <div class="caption">
              <div class="blur"></div>
              <div class="caption-text">
                <p>????</p>
              </div>
            </div>
          </a>
        </li>
        */


        ?>
    </ul>


</main>

<footer>
    <div class="container-fluid">
        <div class="row final">
            <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
            <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
        </div>
    </div>


</footer>


<script src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"></script>
</body>

</html>