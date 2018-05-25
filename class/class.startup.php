<?php

class Startup {

  //protected $db;

  public function __construct($db) {
    $this->db = $db;
  }

  public function getStartupInformation($id) {
    /*
    (IN) $id(int): id of the startup for which we want to collect the data
    (OUT) array with information / false if no startup was found
    */

    $data = array();

    try {

      $statement = $this->db->prepare(
        "SELECT
        `C`.`idClasse` as `idStartup`,
        `C`.`nameClasse` as `nameStartup`,
        `I`.`idImplantation`,
        `I`.`nameimplantation`

        FROM `classe` as `C`
        LEFT JOIN `classeImplantationRelation` as `CIR` ON `C`.`idClasse` = `CIR`.`idClasse`
        LEFT JOIN `implantation` as `I` on `CIR`.`idImplantation` = `I`.`idImplantation`

        WHERE `C`.`idClasse` = :idStartup

        LIMIT 0,1");
      $statement->bindParam(':idStartup', $id, PDO::PARAM_INT);
      $statement->execute();

      if( $statement->rowCount() ) {

        //$tmp = $statement->fetch(PDO::FETCH_ASSOC);
        $data = $statement->fetch(PDO::FETCH_ASSOC);

        $statement = null;
        $statement = $this->db->prepare(
          "SELECT
          `O`.`keyOption` as `type`,
		      `O`.`valueOption` as `value`,
          `O`.`nameOption` as `name`,
          `CM`.`valueClasseMeta` as `value`

          FROM `classeMeta` as `CM`
          LEFT JOIN `option` as `O` ON `O`.`idOption` = `CM`.`idOption`

           WHERE `CM`.`idClasse` = :idStartup");
        $statement->bindParam(':idStartup', $id, PDO::PARAM_INT);
        $statement->execute();

        if ($statement->rowCount() > 0) {
          $data['meta'] = array();
          while ( $en = $statement->fetch(PDO::FETCH_ASSOC) ) {
            array_push($data['meta'], $en);
          }
        }

        return $data;

      } else {
        return false;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function updateStartupName($id,$value) {
    /*
    (IN) [INTEGER] id of the implantation to update
    (IN) [STRING] new value for the update
    (OUT) value if value was well updated / false if not
    */

    try {

      $statement = $this->db->prepare("UPDATE `classe` SET `nameClasse` = :value WHERE `idClasse` = :id");
      $statement->bindParam(':value', $value, PDO::PARAM_STR);
      $statement->bindParam(':id', $id, PDO::PARAM_INT);
      $statement->execute();

      return $name;

    } catch (PDOException $e) {

      return false;

    }

  }

  public function getStartupCount() {
    /*
    (OUT) int with number of startup / 0 if no startup was found
    */
    try {

      $statement = $this->db->prepare("SELECT COUNT(`C`.`idClasse`) as `number` FROM `classe` as `C`");
      $statement->execute();

      if($statement->rowCount() > 0) {
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        return intval($data['number']);
      } else {
        return 0;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getStartupList($start = 0, $number = 25, $orderBy = 'nameClasse', $orderDir = 'ASC') {
    /*
    (IN) [INT] $start: start number (for pagination)
    (IN) [INT] $number; how many items (for pagination)
    (IN) [STRING] $orderBy: name of the column for the order
    (IN) [STRING] $orderDir: order ASC or DESC
    (OUT) array with information / false if no implantation was found
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `C`.`idClasse` as `id`,
        `C`.`nameClasse` as `name`,
        `I`.`idImplantation`,
        `I`.`nameimplantation`

        FROM `classe` as `C`
        LEFT JOIN `classeImplantationRelation` as `CIR` ON `C`.`idClasse` = `CIR`.`idClasse`
        LEFT JOIN `implantation` as `I` on `CIR`.`idImplantation` = `I`.`idImplantation`

        ORDER BY  `C`.`".$orderBy."` ".$orderDir."

        LIMIT ".$start.",".$number);
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

  public function getStartupMemberCount($id, $typeUser = 'learner') {
    /*
    (IN) $id(int): id of the startup for which we want to collect the data
    (IN) $typeUser(string): type of user we want to select 'learner' or 'coach'
    (OUT) array with information / false if no startup was found
    */

    try {

      $data = array();
      $statement = $this->db->prepare(
        "SELECT
        COUNT(`U`.`idUser`) as `number`

        FROM `user` as `U`
        LEFT JOIN `userClasseRelation` as `UCR` ON `U`.`idUser` = `UCR`.`idUser`

        WHERE `UCR`.`idClasse` = :idStartup AND `U`.`typeUser` = :typeUser");

      $statement->bindParam(':idStartup', $id, PDO::PARAM_INT);
      $statement->bindParam(':typeUser', $typeUser, PDO::PARAM_STR);
      $statement->execute();

      if($statement->rowCount() > 0) {
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        return intval($data['number']);
      } else {
        return 0;
      }

    } catch (PDOException $e) {
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function getStartupMemberList($id, $typeUser = 'learner') {
    /*
    (IN) $id(int): id of the startup for which we want to collect the data
    (IN) $typeUser(string): type of user we want to select 'learner' or 'coach'
    (OUT) array with information / false if no startup was found
    */

    try {

      $statement = $this->db->prepare(
        "SELECT
        `U`.`idUser` as `id`,
        `U`.`firstNameUser` as `firstName`,
        `U`.`lastNameUser` as `lastName`,
        `U`.`emailUser` as `email`,
        `L`.`nameLanguageEnglish` as `mainLanguageName`,
        `U`.`mainLanguageUser` as `mainLanguageCode`

        FROM `user` as `U`
        LEFT JOIN `userClasseRelation` as `UCR` ON `U`.`idUser` = `UCR`.`idUser`
        LEFT JOIN `language` as `L` ON `U`.`mainLanguageUser` = `L`.`codeLanguage`

        WHERE `UCR`.`idClasse` = :idStartup AND `U`.`typeUser` = :typeUser");
      $statement->bindParam(':idStartup', $id, PDO::PARAM_INT);
      $statement->bindParam(':typeUser', $typeUser, PDO::PARAM_STR);
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

  public function addStartup($name, $idImplantation = false) {
    /*
    (IN) [string] email of the user to check
    (IN) [integer/boolean]: $idImplantation. An integer with the id of the implantation or false if no implantation
    (OUT) return last id is insertion was well done / false if not
    */

    try {

      $this->db->beginTransaction();

      $statement = $this->db->prepare("INSERT INTO `classe` (`idClasse`,`nameClasse`) VALUES (NULL,:name)");
      $statement->bindParam(':name', $name, PDO::PARAM_STR);
      $statement->execute();

      $idStartup = intval($this->db->lastInsertId());
      $idImplantation = intval($idImplantation);

      if ($idImplantation != false) {
        $statement = $this->db->prepare("INSERT INTO `classeImplantationRelation` (`idClasseImplantationRelation`,`idClasse`,`idImplantation`) VALUES (NULL,:idStartup,:idImplantation)");
        $statement->bindParam(':idStartup', $idStartup, PDO::PARAM_INT);
        $statement->bindParam(':idImplantation', $idImplantation, PDO::PARAM_INT);
        $statement->execute();
      }

      if( $this->db->commit() ) { // if all is ok, we validate the transaction and check the validation is good
        return $idStartup; // we return the ID od the new user
      } else {
        return false;
      }

    } catch (PDOException $e) {
      $this->db->rollback();
      $statement = null;
      print "Error !: " . $e->getMessage() . "<br/>";
      die();
    }

  }

  public function deleteStartup($idStartup) {
    /*
    (IN) [INT] id of the implantation to delete
    (OUT) an array wuth the results.
    */

    $answer = array();
    $idStartup = intval($idStartup); // to be sure that is a integer (if it's valid data)

    try {

      // we check if there is still users attached to this startup
      $statement = $this->db->prepare("SELECT `idUserClasseRelation` FROM `userClasseRelation` WHERE `idClasse` = :idStartup");
      $statement->bindParam(':idStartup', $idStartup, PDO::PARAM_INT);
      $statement->execute();

      if( $statement->rowCount() > 0 ) {

        $answer['status'] == 'error';
        $answer['message'] = 'Sorry, there are still some users attached to this startup. So, you can\'t delete it.';

      } else {

        $this->db->beginTransaction(); // we start a transaction

        // if we could delete it, we can destroy the relation with the implantation
        $statement = $this->db->prepare("DELETE FROM `classeImplantationRelation` WHERE `idClasse` = :idStartup");
        $statement->bindParam(':idStartup', $idStartup, PDO::PARAM_INT);
        $statement->execute();

        // we delete the startup
        $statement = $this->db->prepare("DELETE FROM `classe` WHERE `idClasse` = :idStartup");
        $statement->bindParam(':idStartup', $idStartup, PDO::PARAM_INT);
        $statement->execute();

        if( $statement->rowCount() == 0 ) {
          $this->db->rollback(); // we cancel the transaction
          $answer['status'] == 'error';
          $answer['message'] = 'Sorry, an error occurred while deleting the startup';
        } else {
          $this->db->commit(); // we confirm the transaction
          $answer['status'] == 'success';
          $answer['message'] = 'The startup was well deleted.';
        }
      }

      return $answer;

    } catch (PDOException $e) {

      $answer['status'] = 'error';
      $answer['message'] = 'Error !: ' . $e->getMessage();
      return $answer;

    }

  }


}


?>
