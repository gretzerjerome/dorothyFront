<?php

class System {

  // protected $db;

  public function __construct($db) {
    $this->db = $db;
  }

  public function getOptionList($type, $orderBy = 'nameOption', $orderDir = 'ASC') {
    /*
    (IN) [string] $type:  key of the option
    (IN) [string] $orderDir:  order ASC or DESC
    (OUT) an array with the values / false if not
    */

    try {

      $data = array();

      $statement = $this->db->prepare(
        "SELECT
        `O`.`idOption` as `id`,
        `O`.`valueOption` as `value`,
        `O`.`nameOption` as `name`

        FROM `option` as `O`

        WHERE `O`.`keyOption` = :typeOption

        ORDER BY  `O`.`".$orderBy."` ".$orderDir);

      $statement->bindParam(':typeOption', $type, PDO::PARAM_STR);
      $statement->execute();

      if($statement->rowCount() > 0) {
        return $statement->fetchAll(PDO::FETCH_ASSOC);
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getOptionId($type) {
    /*
    (IN) [string] $type:  key of the option
    (OUT) id of the option / false if not
    */

    try {

      $statement = $this->db->prepare("SELECT `O`.`idOption` as `id` FROM `option` as `O` WHERE `O`.`valueOption` = :valueOption LIMIT 0,1");

      $statement->bindParam(':valueOption', $type, PDO::PARAM_STR);
      $statement->execute();

      if($statement->rowCount() > 0) {
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        return intval($data['id']);
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getLanguageList($orderBy = 'nameLanguageEnglish', $orderDir = 'ASC') {
    /*
    (IN) [string] $orderBy: name of the column
    (IN) [string] $orderDir:  order ASC or DESC
    (OUT) an array with the values / false if not
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `L`.`codeLanguage` as `value`,
        `L`.`nameLanguageEnglish` as `name`

        FROM `language` as `L`

        ORDER BY  `L`.`".$orderBy."` ".$orderDir);

      $statement->execute();

      if($statement->rowCount() > 0) {
        return $statement->fetchAll(PDO::FETCH_ASSOC);
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getCountryList($orderBy = 'nameCountryEnglish', $orderDir = 'ASC') {
    /*
    (IN) [string] $orderBy: name of the column
    (IN) [string] $orderDir:  order ASC or DESC
    (OUT) an array with the values / false if not
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `C`.`codeCountry` as `value`,
        `C`.`nameCountryEnglish` as `name`

        FROM `country` as `C`

        ORDER BY  `C`.`".$orderBy."` ".$orderDir);

      $statement->execute();

      if($statement->rowCount() > 0) {
        return $statement->fetchAll(PDO::FETCH_ASSOC);
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getCountryName($value) {
    /*
    (IN) [string] $value: country code
    (OUT) [string] name of the country / false if not
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `C`.`codeCountry` as `value`,
        `C`.`nameCountryEnglish` as `name`

        FROM `country` as `C`

        WHERE `C`.`codeCountry` = :value

        LIMIT 0,1");

      $statement->bindParam(':value', $value, PDO::PARAM_STR);
      $statement->execute();

      if($statement->rowCount() > 0) {
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $data['name'];
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getCountryCode($value) {
    /*
    (IN) [string] $value: name of the country
    (OUT) [string] code of the country / false if not
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `C`.`codeCountry` as `value`,
        `C`.`nameCountryEnglish` as `name`

        FROM `country` as `C`

        WHERE `C`.`nameCountryEnglish` LIKE :value

        LIMIT 0,1");

      $statement->bindParam(':value', $value, PDO::PARAM_STR);
      $statement->execute();

      if($statement->rowCount() > 0) {
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $data['value'];
      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }


}

?>
